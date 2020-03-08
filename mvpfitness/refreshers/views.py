import json
from django.shortcuts import render
from .serializers import *
from .models import Routine
from rest_framework.response import Response
from home.models import Fitness
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework import status
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


class RoutineView(APIView):
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        routine = self.create_routine(body)
        return Response({"status":"Succesfull"}, status=status.HTTP_200_OK)

    def create_routine(self, body):
        user = self.request.user
        user_routine = Routine(**body)
        user_routine.created_by = user
        user_routine.created_at = now
        user_routine.save()
        return user_routine


class ListRoutines(APIView):
    def get(self, request):
        routines_obj = Routine.objects.all()
        routines = RoutineSerializer(routines_obj, many=True).data
        return Response({'routine_details': routines}, status=status.HTTP_200_OK)


class PosesView(APIView):
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        pose = self.create_pose(body)
        return Response({"status":"Succesfull"}, status=status.HTTP_200_OK)

    def create_pose(self, body):
        user = self.request.user
        fitness = Fitness.objects.get(id=body['fitness_id'])
        body['fitness_id'] = fitness
        pose_routine = Poses(**body)
        pose_routine.created_by = user
        pose_routine.created_at = now
        pose_routine.save()
        return pose_routine


class ListPoses(APIView):
    def get(self, request):
        poses_obj = Poses.objects.all()
        poses = PosesSerializer(poses_obj, many=True).data
        return Response({'pose_details': poses}, status=status.HTTP_200_OK)


class RoutinePosesView(APIView):
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        pose = self.routine_create_pose(body)
        return Response({"status":"Succesfull"}, status=status.HTTP_200_OK)

    def routine_create_pose(self, body):
        user = self.request.user
        pose = Poses.objects.get(id=body['pose_id'])
        routine = Routine.objects.get(id=body['routine_id'])
        body['pose_id'] = pose
        body['routine_id'] = routine
        pose_routine = PosesRoutine(**body)
        pose_routine.created_by = user
        pose_routine.created_at = now
        pose_routine.save()
        return pose_routine


class ListRoutinePoses(APIView):
    def get(self, request):
        routine_poses_obj = PosesRoutine.objects.all()
        routine_poses = RoutinePosesSerializer(routine_poses_obj, many=True).data
        return Response({'routine_pose_details': routine_poses}, status=status.HTTP_200_OK)