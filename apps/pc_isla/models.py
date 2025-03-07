from django.db import models
from django.conf import settings
from django.db.models.query import QuerySet
from django.utils import timezone
from django.utils.text import slugify
import os
from django.core.files.storage import FileSystemStorage
from datetime import timedelta
from apps.base.models import Institucion, Persona


User = settings.AUTH_USER_MODEL
MEDIA_FOLDER = 'proyectos_pc_isla'
EQUIPO_CHOICES = (
    ('Bora Bora', 'Bora Bora'),
    ('Juan Fernández', 'Juan Fernández'),
    ('Rapa Nui', 'Rapa Nui'),
)
ROL_CHOICES = (
    ('encargado', 'Encargado'),
    ('investigador', 'Investigador'),
)

ESTADO_CHOICES = (
    ('solicitud recibida', 'Solicitud recibida'),
    ('confección del protocolo', 'Confección del protocolo'),
    ('en curso', 'En curso'),
    ('finalizado', 'Finalizado'),
    ('rechazado', 'Rechazado'),
)
HORARIO_CHOICES = (
    ('AM', 'AM'),
    ('PM', 'PM'),
)
DIAS_CHOICES = (
    ('lunes', 'Lunes'),
    ('martes', 'Martes'),
    ('miércoles', 'Miércoles'),
    ('jueves', 'Jueves'),
    ('viernes', 'Viernes'),
)
SALIDA_CHOICES = (
    ('fin jornada', 'Fin jornada'),
    ('proceso ejecutándose', 'Proceso ejecutándose'),
    ('extracción de datos', 'Extracción de datos'),
    ('inasistencia anticipada', 'Inasistencia anticipada'),
    ('asistencia cedida', 'Asistencia cedida'),
    ('otro', 'Otro')
)

ASISTENCIA_TIPO_CHOICES = (
    ('regular', 'Regular'),
    ('recuperación', 'Recuperación'),
    ('extra', 'Extra'),
)

def proyecto_upload_path(instance, filename):
    sigla = instance.institucion.sigla
    nombre = slugify(instance.nombre).replace('-', '_')

    # Folder path
    folder_path = os.path.join(MEDIA_FOLDER, sigla, nombre)

    # Si la carpeta no existe, crear una
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    date = '-'.join(reversed(instance.fecha_oficio_recibido.split('-')))
    new_filename = f"{sigla}_oficio_recibido_{date}.pdf"

    return os.path.join(folder_path, new_filename)

def respuesta_upload_path(instance, filename):
    sigla = instance.institucion.sigla
    nombre = slugify(instance.nombre).replace('-', '_')

    # Folder path
    folder_path = os.path.join(MEDIA_FOLDER, sigla, nombre)
    date = '-'.join(reversed(instance.fecha_oficio_respuesta.split('-')))
    new_filename = f"{sigla}_oficio_respuesta_{date}.pdf"

    return os.path.join(folder_path, new_filename)

def protocolo_upload_path(instance, filename):
    sigla = instance.institucion.sigla
    
    nombre = slugify(instance.nombre).replace('-', '_')

    # Folder path
    folder_path = os.path.join(MEDIA_FOLDER, sigla, nombre)
    new_filename = f"{sigla}_protocolo_de_uso.pdf"

    return os.path.join(folder_path, new_filename)
     
def documento_extension_upload_path(instance, filename):
    sigla = instance.institucion.sigla
    nombre = slugify(instance.nombre).replace('-', '_')

    folder_path = os.path.join(MEDIA_FOLDER, sigla, nombre)

    date = '-'.join(reversed(instance.fecha_extension.split('-')))
    new_filename = f"{sigla}_solicitud_extension_{date}.pdf"

    return os.path.join(folder_path, new_filename)



# Create your models here.
class Proyecto(models.Model):
    class Meta:
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"
        #ordering
    
    class ProyectoObjects(models.Manager):
        def get_queryset(self) -> QuerySet:
             return super().get_queryset().filter(~models.Q(estado__in=['finalizado', 'rechazado']))

    # Solicitud recibida
    institucion = models.ForeignKey(Institucion, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length=255, null=True)
    objetivo = models.TextField(null=True)
    encargado_sii = models.ForeignKey(Persona, on_delete=models.SET_NULL, null=True, related_name="encargado_sii_proyecto")
    backup_sii =  models.ForeignKey(Persona, on_delete=models.SET_NULL, null=True, related_name="backup_sii_proyecto")
    oficio_recibido = models.FileField(upload_to=proyecto_upload_path, max_length=500)
    fecha_oficio_recibido = models.DateField(null=True)
    gabinete = models.CharField(max_length=50, null=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    timestamp_creacion = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    estado = models.CharField(max_length=50, choices=ESTADO_CHOICES, default="solicitud recibida")

    # Respuesta SII
    oficio_respuesta = models.FileField(upload_to=respuesta_upload_path, max_length=500, null=True, blank=True)
    fecha_oficio_respuesta = models.DateField(null=True, blank=True)

    # Protocolo de uso
    protocolo = models.FileField(upload_to=protocolo_upload_path, max_length=500, null=True, blank=True)
    fecha_inicio = models.DateField(null=True, blank=True)
    fecha_termino = models.DateField(null=True, blank=True)

    # Extensión del proyecto
    extendido = models.BooleanField(default=0)
    fecha_extension = models.DateField(null=True, blank=True)
    documento_extension = models.FileField(upload_to=documento_extension_upload_path, max_length=500, null=True, blank=True)

    objects = models.Manager()
    queryobjects = ProyectoObjects()

    def es_fecha_termino_menor_o_igual_a_2_semanas(self):
        if self.fecha_termino is None:
            return False
        fecha_limite = timezone.now().date() + timedelta(weeks=2)
        return self.fecha_termino <= fecha_limite

    def es_fecha_termino_menor_o_igual_a_1_mes(self):
        if self.fecha_termino is None:
            return False
        fecha_limite = timezone.now().date() + timedelta(weeks=4)
        return self.fecha_termino <= fecha_limite

    def __str__(self):
        return f"{self.id} {self.institucion.sigla} - {self.nombre}"
    

class Rol(models.Model):

    class Meta:
        verbose_name = "Rol"
        verbose_name_plural = "Roles"

    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, null=False)
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, null=False)
    rol = models.CharField(max_length=50, choices=ROL_CHOICES, null=False)

    objects = models.Manager()

    def __str__(self):
        return f"{self.persona.nombre} - {self.proyecto.institucion.sigla} - {self.proyecto.nombre}"


# class Jornada(models.Model):

#     class Meta:
#         verbose_name = "Jornada"
#         verbose_name_plural = "Jornadas"
    
#     proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, null=False)
#     equipo = models.CharField(max_length=50, choices=EQUIPO_CHOICES, null=False)
#     horario = models.CharField(max_length=50, choices=HORARIO_CHOICES, null=False)
#     dia = models.CharField(max_length=50, choices=DIAS_CHOICES, null=False)
#     extra = models.BooleanField(default=0)
#     fecha = models.DateField(null=True, blank=True)
#     active = models.BooleanField(default=1)

#     def __str__(self):
#         return f"({self.id}) Proyecto: {self.proyecto.id} {self.equipo} {self.dia} {self.horario} {'[Extra]' if self.extra else ''}"


class Asistencia(models.Model):

    class Meta:
        verbose_name = "Asistencia"
        verbose_name_plural = "Asistencias"
    
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, null=False, default=1)
    equipo = models.CharField(max_length=50, choices=EQUIPO_CHOICES, null=False, default='Bora Bora')
    horario = models.CharField(max_length=50, choices=HORARIO_CHOICES, null=False, default='AM')
    fecha = models.DateField(null=False)
    tipo = models.CharField(max_length=50, choices=ASISTENCIA_TIPO_CHOICES, null=False, default='regular')
    datetime_ingreso = models.CharField(max_length=20, null=True, blank=True)
    datetime_salida = models.CharField(max_length=20, null=True, blank=True)
    motivo_salida = models.CharField(max_length=50, choices=SALIDA_CHOICES, null=True, blank=True)
    observacion = models.CharField(max_length=250, null=True, blank=True)


    def __str__(self):
        return f"({self.id}) {self.fecha} - {self.equipo} {self.horario} Proyecto {self.proyecto.id}"


class AsistenciaInvestigador(models.Model):

    class Meta:
        verbose_name = "AsistenciaInvestigador"
        verbose_name_plural = "AsistenciasInvestigador"
    
    asistencia = models.ForeignKey(Asistencia, on_delete=models.CASCADE, null=False)
    investigador = models.ForeignKey(Persona, on_delete=models.CASCADE, null=False)

