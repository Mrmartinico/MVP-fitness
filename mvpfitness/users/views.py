import json
from datetime import datetime
from django.utils import timezone
from .models import User, Tier, Address, SocialMedia, MyUserManager
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
from rest_framework import status


class CreateUser(APIView):
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user_status = self.create_user(body)
        return Response(user_status, status=status.HTTP_200_OK)

    def create_user(self, body):
        user_status = {'status': "User Email Already exists"}
        if body['user_type'] == "user" and not User.objects.filter(email=body['email']).exists():
            user_status['status'] = "User Created Successfully"
            user = MyUserManager.create_user(self, first_name=body['first_name'], last_name=body['last_name'],
                                    username=body['user_name'],
                                    email=body['email'], password=body['password'], user_type=body['user_type'],
                                    timezone=body['timezone'], created_at=datetime.now(tz=timezone.utc),
                                    date_of_birth=datetime.strptime(body['dob'], '%d-%m-%Y') if body[
                                        'dob'] else '0001-01-01',
                                    gender=body['gender'], account_status=True, height=body['height'],
                                    weight=body['weight'],
                                    telephone=body['telephone'], profile_image='', fitness_types=body['activities'],
                                    is_staff=True, is_superuser=False)
            address = Address(street_name=body['street'], country=body['country'], state=body['state'],
                              city=body['city'], zip_code=body['zip_code'], user_id=user)
            address.save()

            if body['signup_type'] == "social_media":
                social_media = SocialMedia(self, social_platform=body['social_media_type'],
                                           session_id=body['social_media_id'], user_id=user)
                social_media.save()

            user_status.update({'full_name': body['full_name'], 'email': body['email'], 'user_id': user.id,
                                'user_type': body['user_type']})
        return user_status


class LoginUser(APIView):
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body['username']
        user = User.objects.filter(email=username)
        login_status = {}
        if body['login_type'] == "normal" and body['user_type'] == "user":
            password = body['password']
            login_valid = (user[0].email == username) if user.exists() else False
            pwd_valid = check_password(password, user[0].password) if user.exists() else False
            if not user.exists():
                login_status['status'] = "User is not registered with current email"
                return Response(login_status, status=status.HTTP_200_OK)
            if login_valid and pwd_valid:
                login_status = {'status': "User logged in successfully", 'full_name': user[0].get_full_name(),
                                'email': user[0].email, 'user_id': user[0].id, 'user_type': user[0].user_type}
                return Response(login_status, status=status.HTTP_200_OK)
            if not login_valid or not pwd_valid:
                login_status['status'] = "Either username or password is incorrect"
                return Response(login_status, status=status.HTTP_200_OK)

        if body['login_type'] == "social_media" and body['user_type'] == "user":
            user_social = SocialMedia.objects.filter(session_id=body['social_media_id'])
            if user.exists():
                if not user_social.exists():
                    social_media = SocialMedia(self, social_platform=body['social_media_type'],
                                               session_id=body['social_media_id'],
                                               user_id=user[0])
                    social_media.save()
                login_status = {'full_name': '', 'email': user[0].email, 'user_id': user[0].id, 'user_type': user[0].user_type,
                                'user_exist': True, 'social_media_id': body['social_media_id']}
                return Response(login_status, status=status.HTTP_200_OK)
            else:
                login_status = {'full_name': '', 'email': '', 'user_id': '', 'user_type': '', 'user_exist': False}
                return Response(login_status, status=status.HTTP_200_OK)
