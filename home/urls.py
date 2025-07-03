from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


from . import views

urlpatterns = [
    path('', views.index, name='index',),
    path('contactus', views.feedback, name='feedback',),
]

urlpatterns = format_suffix_patterns(urlpatterns)
