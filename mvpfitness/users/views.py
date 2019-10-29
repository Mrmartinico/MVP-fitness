import json
from datetime import datetime
from django.utils import timezone
from .models import User, Tier, Address, SocialMedia
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
from rest_framework import status


class CreateUser(APIView):
    def post(self, request):
        user_status = "User Email Already exists"
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        if not User.objects.filter(email=body['email']).exists():
            user_status = "User Created Successfully"
            user = User.create_user(self, first_name=body['first_name'], last_name=body['last_name'], username=body['user_name'],
                    email=body['email'], password=body['password'], user_type=body['user_type'],
                    timezone=body['timezone'], created_at=datetime.now(tz=timezone.utc), date_of_birth=datetime.strptime(body['dob'], '%d-%m-%Y'),
                    gender=body['gender'], account_status=True, height=body['height'], weight=body['weight'],
                    telephone=body['telephone'], profile_image='')
            address = Address(street_name=body['street'], country=body['country'], state=body['state'],
                              city=body['city'], zip_code=body['zip_code'], user_id=user)
            address.save()
        return Response(user_status, status=status.HTTP_200_OK)


class LoginUser(APIView):
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body['username']
        password = body['password']
        user = User.objects.filter(email=username)
        login_valid = (user[0].email == username) if user.exists() else False
        pwd_valid = check_password(password, user[0].password) if user.exists() else False
        if not user.exists():
            login_status = "User is not registered with current email"
            return Response(login_status, status=status.HTTP_200_OK)
        if login_valid and pwd_valid:
            login_status = "User logged in successfully"
            return Response(login_status, status=status.HTTP_200_OK)
        if not login_valid or not pwd_valid:
            login_status = "Either username or password is incorrect"
            return Response(login_status, status=status.HTTP_200_OK)
