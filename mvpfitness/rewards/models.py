from django.db import models
from django.conf import settings
from users.models import User, Counter
# Create your models here.

class RewardCategory(models.Model):
    description = models.TextField(null=True, max_length=100)
    reward_target = models.IntegerField()


class RewardSession(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    fitness_id = models.ForeignKey('home.Fitness', on_delete='', related_name='fitness_types')
    instructor_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete='', related_name='reward_instructor')
    category_id = models.ForeignKey(RewardCategory, on_delete='')
    week_number = models.IntegerField()
    week_day = models.CharField(max_length=15)
    date = models.DateField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    attendee_count = models.IntegerField(null=True)
    created_at = models.DateTimeField()
    session_duraton = models.DecimalField(max_digits=5, decimal_places=2)
    session_path =  models.CharField(max_length=250)