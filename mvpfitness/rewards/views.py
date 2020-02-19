from django.shortcuts import render
from django.core import serializers
from django.db.models import Sum
from home.models import UserSession
from rewards.models import RewardSession, RewardCategory
from django.db.models import Count, Q
from datetime import datetime, timezone, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as STATUS
from users.models import Counter, User
import json

# Create your views here.
class RewardView(APIView):
    def process_sessions(self, reward, sessions, locked=False):
        session = {'id': reward.id,
                   'fitness_id': reward.fitness_id.id,
                   'instructor_id': reward.instructor_id.id,
                   'category_description': reward.category_id.description,
                   'week_number': reward.week_number,
                   'week_day': reward.week_day,
                   'date': reward.date,
                   'start_time': reward.start_time,
                   'end_time': reward.end_time,
                   'attendee_count': reward.attendee_count,
                   'session_duraton': reward.session_duraton,
                   'session_path': reward.session_path,
                   'locked': locked}
        sessions.append(session)
        return sessions

    def update_rewards(self, usr_sess_count, remaining_sessions, rewards, status=""):
        current_sess = {'completed_sessions': usr_sess_count, 'remaining_sessions': remaining_sessions}
        rewards.update({'current_sess': current_sess, 'status':status})
        return rewards

    def get(self, request):
        rewards = {}
        locked_sessions = []
        unlocked_sessions = []
        # user = request.user
        user = User.objects.get(email=request.query_params.get('email'))
        user_sessions = UserSession.objects.filter(user_id=user.id)
        user_reward_sessions = user_sessions.exclude(reward_id__isnull=True).order_by('reward_id')
        reward_sessions = RewardSession.objects
        reward_category_obj = RewardCategory.objects
        if user_sessions.exists() and not user_reward_sessions.exists():
            usr_sess_count = user_sessions.count()
            if reward_sessions.exists():
                reward_sess_count = 0
                unlocked_category_ids = []
                rewards_processed = False
                for reward_category in reward_category_obj.all().order_by('id'):
                    if rewards_processed:
                        continue
                    reward_sess_count += reward_category.reward_target
                    if reward_sess_count < usr_sess_count:
                        unlocked_category_ids.append(reward_category.id)
                    if reward_sess_count >= usr_sess_count:
                        remaining_sessions = reward_sess_count - usr_sess_count
                        for reward in reward_sessions.filter(category_id__in=unlocked_category_ids).order_by(
                                'category_id'):
                            self.process_sessions(reward, unlocked_sessions)
                        if remaining_sessions > 0:
                            self.update_rewards(usr_sess_count, remaining_sessions, rewards)
                            rewards_processed = True
                        next_unlocked_ids = reward_category_obj.exclude(id__in=unlocked_category_ids).order_by(
                            'id').values_list('id')
                        if next_unlocked_ids:
                            for reward in reward_sessions.filter(category_id__in=next_unlocked_ids).order_by(
                                    'category_id'):
                                # if usr_sess_count < reward_sess_count:
                                #     self.process_sessions(reward, unlocked_sessions)
                                #     self.update_rewards(usr_sess_count, remaining_sessions, rewards)
                                if remaining_sessions == 0 and next_unlocked_ids and next_unlocked_ids[0][
                                    0] == reward.category_id.id:
                                    self.process_sessions(reward, unlocked_sessions)
                                    self.update_rewards(usr_sess_count, reward.category_id.reward_target, rewards)
                                if remaining_sessions > 0:
                                    self.process_sessions(reward, locked_sessions, locked=True)
                            rewards_processed = True
                        elif not rewards_processed and not next_unlocked_ids:
                            status = 'All Rewards Completed. Wait to get next reward'
                            self.update_rewards(usr_sess_count, remaining_sessions=0, rewards=rewards, status=status)
            else:
                rewards.update({"status": 'No Rewards Exists. Wait for upcoming reward'})

        if user_reward_sessions.exists():
            reward_sess = user_reward_sessions.last().reward_id
            reward_sessions_unlocked = reward_sessions.filter(category_id__lt=reward_sess.category_id)
            reward_sessions_locked = reward_sessions.filter(category_id__gte=reward_sess.category_id).order_by(
                'category_id')
            reward_session_ids = reward_sessions_unlocked.values_list('id')
            rewards_category = reward_sessions_unlocked.order_by('category_id').values_list('category_id')
            reward_sess_count = reward_category_obj.filter(id__in=rewards_category).aggregate(
                Sum('reward_target'))
            # reward_sess_count = reward_sessions.annotate(category_id=Count('category_id__reward_target'))
            # print(reward_sess_count)
            import pdb;pdb.set_trace()
            remaining_sessions = reward_sess_count['reward_target__sum'] - user_sessions.count()
            if remaining_sessions > 0:
                current_sess = {'completed_sessions': user_sessions.count(),
                                'remaining_sessions': remaining_sessions}
                rewards.update({'current_sess': current_sess})
            if remaining_sessions < 0:
                if not reward_sessions_locked.exists():
                    rewards.update({'status': 'All Rewards Completed. Wait to get next reward'})
            user_reward_sessions_ids = user_reward_sessions.values_list('reward_id')
            # unprocessed_rewards_ids = reward_session_ids - user_reward_sessions_ids
            unprocessed_rewards_ids = reward_sessions_unlocked.exclude(id__in=user_reward_sessions_ids).values_list('id')
            unprocessed_rewards = reward_sessions_unlocked.filter(id__in=unprocessed_rewards_ids)
            for reward in unprocessed_rewards:
                unlocked_session = {'id':reward.id,
                                    'fitness_id': reward.fitness_id.id,
                                    'instructor_id': reward.instructor_id.id,
                                    'category_description': reward.category_id.description,
                                    'week_number': reward.week_number,
                                    'week_day': reward.week_day,
                                    'date': reward.date,
                                    'start_time': reward.start_time,
                                    'end_time': reward.end_time,
                                    'attendee_count': reward.attendee_count,
                                    'session_duraton': reward.session_duraton,
                                    'session_path': reward.session_path,
                                    'locked': False}
                unlocked_sessions.append(unlocked_session)

            processed_category = []
            rewards_category = reward_sessions_locked.order_by('category_id').values_list('category_id')
            for reward_session in reward_sessions_locked:
                locked_session = {'id':reward_session.id,
                                  'fitness_id': reward_session.fitness_id.id,
                                  'instructor_id': reward_session.instructor_id.id,
                                  'category_description': reward_session.category_id.description,
                                  'week_number': reward_session.week_number,
                                  'week_day': reward_session.week_day,
                                  'date': reward_session.date,
                                  'start_time': reward_session.start_time,
                                  'end_time': reward_session.end_time,
                                  'attendee_count': reward_session.attendee_count,
                                  'session_duraton': reward_session.session_duraton,
                                  'session_path': reward_session.session_path,
                                  'locked': True}
                if remaining_sessions == 0 and rewards_category and rewards_category[0][0] == reward_session.category_id.id:
                    locked_sessions.append(locked_session)
                    current_sess = {'completed_sessions': user_sessions.count(),
                                    'remaining_sessions': reward_session.category_id.reward_target}
                    rewards.update({'current_sess': current_sess})
                if remaining_sessions < 0:
                    reward_target = reward_session.category_id.reward_target
                    if not reward_target in processed_category:
                        remaining_sessions = reward_session.category_id.reward_target + remaining_sessions
                        processed_category.append(reward_target)
                    if remaining_sessions < 0:
                        unlocked_session = locked_session
                        unlocked_session['locked'] = False
                        unlocked_sessions.append(unlocked_session)
                    if remaining_sessions > 0:
                        locked_sessions.append(locked_session)
                        current_sess = {'completed_sessions': user_sessions.count(),
                                        'remaining_sessions': remaining_sessions}
                        rewards.update({'current_sess': current_sess})
                if remaining_sessions > 0:
                    locked_sessions.append(locked_session)
                    current_sess = {'completed_sessions': user_sessions.count(),
                                    'remaining_sessions': remaining_sessions}
                    rewards.update({'current_sess': current_sess})
        if not user_sessions.exists() and not reward_sessions.exists():
            current_sess = {'completed_sessions': 0, 'remaining_sessions': 0}
            rewards.update({'status': 'Wait to get upcoming sessions', 'current_sess': current_sess})
        if not user_sessions.exists() and reward_sessions.exists():
            category_ids = reward_category_obj.order_by('id').values_list('id')
            reward_sessions = reward_sessions.filter(category_ids).order_by('category_id')
            completed_sessions = user_sessions.count()
            for reward_session in reward_sessions:
                locked_session = {'fitness_id': reward_session.fitness_id.id,
                                    'instructor_id': reward_session.instructor_id.id,
                                    'category_description': reward_session.category_id.description,
                                    'week_number': reward_session.week_number,
                                    'week_day': reward_session.week_day,
                                    'date': reward_session.date,
                                    'start_time': reward_session.start_time,
                                    'end_time': reward_session.end_time,
                                    'attendee_count': reward_session.attendee_count,
                                    'session_duraton': reward_session.session_duration,
                                    'session_path': reward_session.session_path,
                                    'locked': True}
                # if category_ids and category_ids[0] == reward_session.category_id:
                    # unlocked_session.update({'locked': False})
                locked_sessions.append(locked_session)
                current_sess = {'completed_sessions': completed_sessions,
                                    'remaining_sessions': reward_session.category_id.reward_target}
                rewards.update({'current_sess': current_sess, 'status': 'Watch sessions to unlock next reward', })
                # else:
                #     locked_session = unlocked_session
                #     locked_sessions.append(locked_session)
        rewards.update({'locked_sess': locked_sessions, 'unlocked_sess': unlocked_sessions})

        return Response(rewards, status=STATUS.HTTP_200_OK)