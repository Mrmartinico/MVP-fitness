from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# Create your models here.


class SocialMedia(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    social_platform = models.TextField(max_length=50)
    session_id = models.TextField(max_length=70)


class Address(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    street_name = models.CharField(max_length=100)
    country = models.CharField(max_length=70)
    state = models.CharField(max_length=50, blank=True)
    city =  models.CharField(max_length=30)
    zip_code = models.PositiveIntegerField()


class Tier(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    tier_plan = models.CharField(max_length=30)
    tier_amount = models.PositiveIntegerField()
    valid_until = models.DateTimeField()


class User(AbstractBaseUser):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    social_media_id = models.ForeignKey(SocialMedia, on_delete=models.CASCADE)
    address_id = models.ForeignKey(Address, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.TextField(max_length=10)
    email = models.EmailField(max_length=70)
    password = models.CharField(max_length=50)
    user_type = models.CharField(max_length=15)
    timezone = models.CharField(max_length=25)
    created_at = models.DateTimeField()
    cancelled_at = models.DateTimeField(default='')
    date_of_birth = models.DateField()
    suspended_until = models.DateTimeField(default='')
    gender = models.CharField(max_length=20)
    last_attended_date = models.DateTimeField(default='')
    last_login_at = models.DateTimeField(default='')
    tier_id = models.ForeignKey(Tier, on_delete=models.CASCADE)
    account_status = models.CharField(max_length=30)
    password_reminder_token = models.CharField(max_length=100)
    password_remider_expire = models.CharField(max_length=120)
    email_confirmation_token = models.CharField(max_length=150)
    height = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    session_count = models.PositiveIntegerField()
    telephone = models.CharField(max_length=20)

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
