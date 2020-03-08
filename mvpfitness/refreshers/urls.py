__author__ = 'Nishanth'

from django.conf.urls import url, include
from refreshers import views as refresher
from django.urls import path, include

app_name = 'shopdrawing'

urlpatterns = [
    path('<int:routine_id>/', refresher.PoseDetailsView.as_view(), name='Pose_details'),
    path('users/poses/create', refresher.UserPosesView.as_view(), name='User Poses'),
    path('routine/create', refresher.RoutineView.as_view(), name='routine'),
    path('poses/create', refresher.PosesView.as_view(), name='Poses'),
    path('routine_poses/create', refresher.RoutinePosesView.as_view(), name='RoutinePoses'),
    path('poses/get', refresher.ListPoses.as_view(), name='Poses'),
    path('routine/get', refresher.ListRoutines.as_view(), name='Routine'),
    path('routine_poses/get', refresher.ListRoutinePoses.as_view(), name='RoutinePoses')

]