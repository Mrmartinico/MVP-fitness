from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# Create your models here.


class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    username = models.TextField(verbose_name='username', max_length=255, default='')
    first_name = models.TextField(verbose_name='first_name', max_length=255, default='')
    last_name = models.TextField(verbose_name='last_name', max_length=255, default='')
    password = models.TextField(verbose_name='last_name',max_length=50, default='')

    def create_user(self, email, first_name, last_name,username, password):
        if not email:
            raise ValueError('Users must have an email address')
        user = User(email=email, first_name=first_name, last_name=last_name)
        user.username = username
        user.set_password(password)
        user.save()
        return user

    def get_full_name(self):
        return self.first_name + self.last_name

    def get_short_name(self):
        return self.username

    def __str__(self):
        return self.email


    def update_user(self, email, first_name, last_name, username, password):
        if not email:
            raise ValueError('Users must have an email address')
        self.first_name = first_name
        self.username = username
        self.last_name = last_name
        self.email = email
        if password is not None:
            self.set_password(password)
        self.save()
        return self
