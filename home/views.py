from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import RequestContext
from django.contrib import messages
from django.contrib.auth.models import User, Group
from rest_framework import permissions, viewsets
from django.http import JsonResponse, Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.request import Request
from rest_framework.generics import GenericAPIView
from rest_framework import generics
from django.contrib.sessions.models import Session
from django.utils import timezone
from django.conf import settings
from django.templatetags.static import static
from .forms import FeedbackForm
from .serializers import *
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required


# Create your views here.
@login_required
def index(request):

    # Page from the theme 
    if request.method == 'POST':
        feedb = FeedbackForm(request.POST)
        if feedb.is_valid():
            feedb.save()
            messages.add_message(request, messages.INFO, 'Contact Details Submitted Successfully!')
            return redirect('feedback')
    else:
        feedb = FeedbackForm()
    return render(request, 'pages/home.html', {'form': feedb})


def feedback(request):
    if request.method == 'POST':
        feedb = FeedbackForm(request.POST)
        if feedb.is_valid():
            feedb.save()
            messages.add_message(request, messages.INFO, 'Contact Details Submitted Successfully!')
            return redirect('feedback')
    else:
        feedb = FeedbackForm()
    return render(request, 'pages/feedback.html', {'form': feedb})


# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer(queryset)
#     permission_classes = [permissions.IsAuthenticated]


# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Group.objects.all().order_by('name')
#     serializer_class = GroupSerializer(queryset)
#     permission_classes = [permissions.IsAuthenticated]


# def register(request):
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('login')
#     else:
#         form = UserCreationForm()
#     return render(request, 'auth/register.html', {'form': form})
