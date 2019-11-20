from django.contrib import admin
from .models import Session, UserSession, Fitness
# Register your models here.

admin.site.register(Session)
admin.site.register(UserSession)
admin.site.register(Fitness)