__author__ = 'Nishanth'
from django.conf.urls import url, include
from users import views as user


urlpatterns = [
    url(r'^login$', user.LoginUser.as_view()),
    url(r'^create$', user.CreateUser.as_view())
]
