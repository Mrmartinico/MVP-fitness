from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import *
from dict import dict


class FitnessSerializers(ModelSerializer):

    class Meta:
        model = Fitness
        fields = ('specialization_type', 'description')


class UpcomingSessionSerializer(ModelSerializer):
    current_specialization_type = SerializerMethodField('specialization')
    session_date = SerializerMethodField('date')

    def specialization(self, session):
        return session.fitness_id.specialization_type

    def date(self, session):
        return session.date

    class Meta:
        model = Session
        fields = (
        'id', 'week_day', 'session_date', 'start_time', 'end_time', 'session_duraton', 'session_path', 'current_specialization_type',)


class SessionSerializer(ModelSerializer):
    current_specialization_type = SerializerMethodField('specialization')
    instructor_username = SerializerMethodField('user_name')
    expertise_specification = SerializerMethodField('user_specification')
    session_date = SerializerMethodField('date')
    expertise_types = SerializerMethodField('expertise')
    upcoming_sessions = SerializerMethodField('upcoming')

    def specialization(self, session):
        return session.fitness_id.specialization_type

    def user_name(self, session):
        return session.instructor_id.username

    def user_specification(self, session):
        return session.instructor_id.expertise

    def date(self, session):
        return session.date

    def expertise(self, session):
        result = FitnessSerializers(session.instructor_id.specialization_type.all(), many=True)
        return result.data

    def upcoming(self, session):
        sessions = Session.objects.filter(instructor_id=session.instructor_id).order_by('start_time')
        session_data = UpcomingSessionSerializer(sessions[1:], many=True)
        return session_data.data

    class Meta:
        model = Session
        fields = (
        'id', 'week_day', 'session_date', 'start_time', 'end_time', 'session_duraton', 'session_path', 'current_specialization_type',
        'instructor_username', 'expertise_specification', 'expertise_types', 'upcoming_sessions')


class InstructorSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'profile_image')
