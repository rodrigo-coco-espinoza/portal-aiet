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
    path('get_bloques_ocupados/', BloquesOcupados.as_view()),
    path('add_protocolo/', AddProtocolo.as_view()),
    path('download_protocolo/<int:proyecto_id>/', DownloadProtocolo.as_view()),
    path('jornadas_minhacienda/', JornadaMinhacienda.as_view()),
    path('calendario_pc_isla/', HorarioPcIsla.as_view()),
    path('get_asistencias/', AsistenciaList.as_view()),
    path('registrar_ingreso/', RegistrarIngreso.as_view()),
    path('registrar_salida/', RegistrarSalida.as_view()),
    path('add_jornada_extra/', AddJornadaExtra.as_view()),
]