from django.shortcuts import render
from django.core import serializers
from django.db.models import Sum
from .models import Session
from datetime import datetime, timezone, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.models import Counter, User
from refreshers.models import UserRoutine
from .serializers import *
import json


# Create your views here.
class SessionView(APIView):
    def get(self, request):
        instrc_ids = []
        sessions = Session.objects.order_by('start_time')
        filter_sessions = sessions
        for session in sessions:
            if session.instructor_id in instrc_ids:
                filter_sessions = filter_sessions.exclude(id=session.id)
                pass
            instrc_ids.append(session.instructor_id)
        result = SessionSerializer(filter_sessions, many=True).data
        return Response({'sessions': result}, status=status.HTTP_200_OK)


class HomeStatisticsView(APIView):
    def get(self, request):
        usr_id = User.objects.get(email = request.query_params.get('u_name')).id
        user_sessions = UserSession.objects.filter(user_id=usr_id)
        session_acc, total_hours, session_count = self.get_stats(user_sessions)
        response = {'session_accuracy': session_acc, 'session_completed': session_count, 'total_hours': total_hours,
                    'rewards': {'sessions_completed': 18, 'remaining_sessions': 2}, 'community_percentage': 10}
        return Response({'statistics': response}, status=status.HTTP_200_OK)

    def get_stats(self, user_sessions):
        session_count = user_sessions.count()
        aggregtd = user_sessions.aggregate(total_hours=Sum('user_duration'), total_accuracy=Sum('session_accuracy'))
        session_acc = aggregtd['total_accuracy'] / session_count if session_count else 0
        total_hours = aggregtd['total_hours'] if session_count else 0
        return session_acc, total_hours, session_count


class InstructorView(APIView):
    def get(self, request):
        instructors_obj = User.objects.filter(user_type='instructor')
        instructorts = InstructorSerializer(instructors_obj, many=True).data
        return Response({'instructors_details': instructorts}, status=status.HTTP_200_OK)


class StatisticsView(APIView):
    def get(self, request):
        results = {'sessions_completed': 18, 'remaining_sessions': 2}
        usr_id = User.objects.get(email=request.query_params.get('u_name')).id
        for date_period in [0, 6, 29]:
            dt = datetime.now(tz=timezone.utc)
            start = dt.replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(date_period)
            end = dt.replace(hour=23, minute=59, second=59, microsecond=999999)
            user_sessions = UserSession.objects.filter(user_id=usr_id, start_time__range=(start, end))
            session_acc, total_hours, _ = HomeStatisticsView.get_stats(self, user_sessions)
            results.update({str(date_period + 1) + ' days': {'hours': total_hours, 'session_accuracy': session_acc}})
        return Response(results, status=status.HTTP_200_OK)
