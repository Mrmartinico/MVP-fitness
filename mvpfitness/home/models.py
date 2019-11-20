from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db.models import Max
from users.models import Counter, User


# Create your models here.

class Fitness(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    fitness_group = models.CharField(max_length=70)
    category_level = models.CharField(max_length=50)
    category = models.CharField(max_length=80)
    specialization_type = models.CharField(max_length=80)
    description = models.TextField()
    program_duration = models.DecimalField(max_digits=5, decimal_places=2)
    benefits = models.TextField()

    def save(self, **kwargs):
        if not self.id:
            count = Counter.get_counter(self, 'fit')
            self.id = "{}{:03d}".format('fit_', count)
        super().save(*kwargs)

    def __str__(self):
        return '%s: %s' % (self.specialization_type, self.description)

class Session(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    fitness_id = models.ForeignKey(Fitness, on_delete='', related_name='fitness_tpypes')
    instructor_id = models.ForeignKey(User, on_delete='', related_name='user')
    week_number = models.IntegerField()
    week_day = models.CharField(max_length=15)
    date = models.DateField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    attendee_count = models.IntegerField(null=True)
    created_at = models.DateTimeField()
    session_duraton = models.DecimalField(max_digits=5,decimal_places=2)
    session_path =  models.CharField(max_length=250)

    def save(self, **kwargs):
        if not self.id:
            count = Counter.get_counter(self, 'sess')
            self.id = "{}{:03d}".format('sess_', count)
        super().save(*kwargs)


class UserSession(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    user_id = models.ForeignKey(User, on_delete='')
    session_id = models.ForeignKey(Session, on_delete='')
    device_type = models.CharField(max_length=20)
    version = models.CharField(max_length=50, null=True)
    browser = models.CharField(max_length=40, null=True)
    browser_version = models.CharField(max_length=50, null=True)
    os  = models.CharField(max_length=40, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    session_accuracy = models.DecimalField(max_digits=5, decimal_places=2)
    impression_count = models.IntegerField()
    ip_address = models.CharField(max_length=30)
    comments = models.TextField(null=True)
    user_duration = models.DecimalField(max_digits=5, decimal_places=2)

    def save(self, **kwargs):
        if not self.id:
            count = Counter.get_counter(self, 'usr_sess')
            self.id = "{}{:03d}".format('usr_sess_', count)
        super().save(*kwargs)