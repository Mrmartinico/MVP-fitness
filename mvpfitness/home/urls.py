__author__ = 'Nishanth'
from django.conf.urls import url, include
from home import views as session


urlpatterns = [
    url(r'^get-session$', session.SessionView.as_view()),
    url(r'^get-home-statistics$', session.HomeStatisticsView.as_view()),
    url(r'^get-instructors$', session.InstructorView.as_view()),
    url(r'^get-statistics$', session.StatisticsView.as_view())
]