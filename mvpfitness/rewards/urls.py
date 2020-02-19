__author__ = 'Nishanth'
from django.conf.urls import url, include
from rewards import views as reward


urlpatterns = [
    url(r'^get-rewards$', reward.RewardView.as_view()),
    # url(r'^get-home-statistics$', rewards.HomeStatisticsView.as_view()),
    # url(r'^get-instructors$', rewards.InstructorView.as_view()),
    # url(r'^get-statistics$', rwards.StatisticsView.as_view())
]