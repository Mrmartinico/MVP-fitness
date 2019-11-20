from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.contrib.postgres.fields import ArrayField
from django.db.models import Max


# Create your models here.


class User(AbstractBaseUser):
    id = models.CharField(primary_key=True, editable=False, max_length=255)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.TextField(max_length=10)
    email = models.EmailField(max_length=70)
    password = models.CharField(max_length=150)
    user_type = models.CharField(max_length=15)
    expertise = models.TextField(null=True)
    timezone = models.CharField(max_length=25)
    created_at = models.DateTimeField()
    cancelled_at = models.DateTimeField(blank=True, null=True)
    date_of_birth = models.DateField()
    suspended_until = models.DateTimeField(blank=True, null=True)
    gender = models.CharField(max_length=20)
    last_attended_date = models.DateTimeField(blank=True, null=True)
    last_login_at = models.DateTimeField(blank=True, null=True)
    account_status = models.CharField(max_length=30)
    password_reminder_token = models.CharField(max_length=100, default='')
    password_remider_expire = models.CharField(max_length=120, default='')
    email_confirmation_token = models.CharField(max_length=150, default='')
    height = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    session_count = models.PositiveIntegerField(default=0)
    telephone = models.CharField(max_length=20)
    specialization_type = models.ManyToManyField('home.Fitness', related_name='fitness')
    profile_image = models.ImageField(upload_to='', blank=True, null=True, default='')

    def save(self, **kwargs):
        if not self.id:
            count = Counter.get_counter(self, 'usr')
            self.id = "{}{:03d}".format('usr_', count)
        super().save(*kwargs)

    def create_user(self, first_name, last_name, username, email, password, user_type, timezone, created_at,
                    date_of_birth, gender, account_status, height, weight, telephone, profile_image, fitness_types):
        if not email:
            raise ValueError('Users must have an email address')
        user = User(first_name=first_name, last_name=last_name, username=username,
                    email=email, password=password, user_type=user_type,
                    timezone=timezone, created_at=created_at, date_of_birth=date_of_birth,
                    gender=gender, account_status=account_status, height=height, weight=weight,
                    telephone=telephone, profile_image=profile_image)
        user.username = username
        user.set_password(password)
        user.save()
        from home.models import Fitness
        for fit_id in fitness_types:
            fitness = Fitness.objects.get(id=fit_id)
            user.specialization_type.add(fitness)
        return user

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

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


class Address(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    street_name = models.CharField(max_length=100)
    country = models.CharField(max_length=70)
    state = models.CharField(max_length=50, null=True)
    city = models.CharField(max_length=30)
    zip_code = models.CharField(max_length=50)
    user_id = models.ForeignKey(User, on_delete='')
    is_active = models.TextField()

    def save(self, **kwargs):
        if not self.id:
            count = Counter.get_counter(self, 'add')
            self.id = "{}{:03d}".format('add_', count)
        super().save(*kwargs)


class Tier(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    tier_plan = models.CharField(max_length=30)
    tier_amount = models.PositiveIntegerField()
    valid_until = models.DateTimeField()
    is_active = models.TextField()
    user_id = models.ForeignKey(User, on_delete='')

    def save(self, **kwargs):
        if not self.id:
            count = Counter.get_counter('tier')
            self.id = "{}{:03d}".format('tier_', count)
        super().save(*kwargs)


class SocialMedia(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=255)
    social_platform = models.TextField(max_length=50)
    session_id = models.TextField(max_length=70, default='')
    session_id = models.TextField(max_length=70, default='')
    user_id = models.ForeignKey(User, on_delete='')

    def save(self, **kwargs):
        if not self.id:
            count = Counter.get_counter(self, 'social')
            self.id = "{}{:03d}".format('social_', count)
        super().save(*kwargs)


class Counter(models.Model):
    type = models.CharField(max_length=80)
    count = models.IntegerField()

    def get_counter(self, counter_type):
        counter = Counter.objects.get(type=counter_type)
        count = counter.count
        counter.count = counter.count + 1
        counter.save()
        return count
