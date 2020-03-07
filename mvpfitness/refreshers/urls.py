__author__ = 'Nishanth'

from django.conf.urls import url, include
from refreshers import views as refresher
from django.urls import path, include

app_name = 'shopdrawing'

urlpatterns = [
    path('<int:routine_id>/', refresher.PoseDetailsView.as_view(), name='Pose_details'),
]