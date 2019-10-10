import json
from .models import User
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
            User.create_user(self, email=body['email'], first_name=body['first_name'],last_name=body['last_name'],
                                             username=body['username'], password=body['password'])
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