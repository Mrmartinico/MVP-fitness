from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField
from home.models import Fitness
from users.models import Counter
from django.conf import settings

# Create your models here.
class Poses(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fitness_id = models.ForeignKey(Fitness, on_delete='', related_name='fitness_types_refreshers')
    pose_name = models.CharField(max_length=100)
    ml_model_pose_name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    image_url = models.URLField(max_length=500)


class Routine(models.Model):
    routing_name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=150)


# class Refresher(models.Model):
#     id = models.CharField(primary_key=True, editable=False, max_length=25)
#     session_name = models.CharField(max_length=20)
#     session_link = models.URLField(max_length=200)
#     number_of_poses = models.IntegerField()
#     estimated_time = models.DecimalField(max_digits=3, decimal_places=2)
#     pose_details = ArrayField(JSONField(blank=True, null=True), null=True)
#     created_at = models.DateTimeField()
#     created_by = models.CharField(max_length=150)
#     updated_at = models.DateTimeField()
#     updated_by = models.CharField(max_length=150)
#
#     def save(self, **kwargs):
#         if not self.id:
#             count = Counter.get_counter(self, 'refresh')
#             self.id = "{}{:03d}".format('refresh_', count)
#         super().save(*kwargs)

class PosesRoutine(models.Model):
    pose_id = models.ForeignKey(Poses, max_length=150, on_delete='', related_name='pose')
    routine_id = models.ForeignKey(Routine, max_length=200, on_delete='', related_name='routine')
    position = models.IntegerField()


class UserRoutine(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=25)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete='')
    routine_id = models.ForeignKey(Routine, null=True, on_delete='', related_name='routine_id')
    pose_id = models.ForeignKey(Poses, on_delete='', related_name='pose_id')
    device_type = models.CharField(max_length=20)
    version = models.CharField(max_length=50, null=True)
    browser = models.CharField(max_length=40, null=True)
    browser_version = models.CharField(max_length=50, null=True)
    os = models.CharField(max_length=40, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    session_type = models.CharField(max_length=30, null=True)
    impression_count = models.IntegerField()
    ip_address = models.CharField(max_length=30)
    comments = models.TextField(null=True)
    user_duration = models.DecimalField(max_digits=5, decimal_places=2)
    pose_accuracy = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField()
    created_by = models.CharField(max_length=150)