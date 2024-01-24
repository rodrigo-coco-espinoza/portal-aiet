from django.urls import path
from .views import *

urlpatterns = [
    path('change_password', ChangePasswordView.as_view()),
]