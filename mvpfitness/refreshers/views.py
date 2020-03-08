from django.shortcuts import render
from .serializers import *
# from .models import Refresher, Routine
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
# Create your views here.

class PoseDetailsView(ListAPIView):
    serializer_class = PoseDetailSerializers

    def get_queryset(self):
        routine_id = self.kwargs['routine_id']
        queryset = PosesRoutine.objects.filter(routine_id=routine_id)
        return queryset


class UserPosesView(CreateAPIView):
    serializer_class = UserPoseSerializers
    queryset = Routine.objects.all()
