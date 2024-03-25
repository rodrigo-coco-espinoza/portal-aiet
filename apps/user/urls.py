from django.urls import path
from .views import *

urlpatterns = [
    path('change_password', ChangePasswordView.as_view()),
    path('get_encargados_pc_isla', EncargadosPcIslaView.as_view()),
]