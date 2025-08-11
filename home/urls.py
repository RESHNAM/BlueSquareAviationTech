from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


from . import views

urlpatterns = [
    path('', views.index, name='index',),
    path('contactus', views.feedback, name='feedback',),
    path('training', views.drone_training, name='drone-training',),
    path('course_detail', views.drone_course_detail, name='course-detail',),
]

urlpatterns = format_suffix_patterns(urlpatterns)
