from django.urls import path
from .views import *

urlpatterns = [
    path('add_proyecto', AddProyecto.as_view()),
    path('get_instituciones_options', ListInstitucioneSelectView.as_view()),
    path('add_institucion', AddInstitucion.as_view()),
    path('get_proyectos', ListProyectosView.as_view()),
    path('download_oficio_recibido/<int:proyecto_id>/', DownloadOficioRecibido.as_view()),
    path('update_encargados_sii/', ActualizarEncargadosSii.as_view()),
    path('rechazar_proyecto/', RechazarProyecto.as_view()),
    path('aceptar_proyecto/', AceptarProyecto.as_view()),
    path('download_oficio_respuesta/<int:proyecto_id>/', DownloadOficioRespuesta.as_view()),
    path('personas_institucion/<int:institucion_id>/', ListsPersonasInstitucion.as_view()),
]