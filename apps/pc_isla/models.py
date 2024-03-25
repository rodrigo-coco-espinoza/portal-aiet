from django.db import models
from django.conf import settings
from django.db.models.query import QuerySet
from django.utils.text import slugify
import os
from django.core.files.storage import FileSystemStorage

User = settings.AUTH_USER_MODEL

def proyecto_upload_path(instance, filename):
    sigla = instance.institucion.sigla
    nombre = slugify(instance.nombre).replace('-', '_')

    # Folder path
    folder_path = os.path.join('proyectos_pc_isla', sigla, nombre)

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
    folder_path = os.path.join('proyectos_pc_isla', sigla, nombre)
    date = '-'.join(reversed(instance.fecha_oficio_respuesta.split('-')))
    new_filename = f"{sigla}_oficio_respuesta_{date}.pdf"

    return os.path.join(folder_path, new_filename)
     


class Institucion(models.Model):
    class Meta:
        verbose_name = "Institución"
        verbose_name_plural = "Instituciones"
        ordering = ('sigla', )

    nombre = models.CharField(max_length=255, unique=True)
    sigla = models.CharField(max_length=255, unique=True)
    rut = models.CharField(max_length=12, null=True)
    direccion = models.CharField(max_length=255, null=True)

    options = (
        ('empresa pública', 'Empresa pública'),
        ('ministerio', 'Minsiterio'),
        ('municipalidad', 'Municipalidad'),
        ('servicio público', 'Servicio público'),
        ('privado', 'Privado')
    )
    tipo = models.CharField(max_length=20, choices=options, default="servicio público")
    
    ministerio = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, default=None)

    objects = models.Manager

    def __str__(self):
        return f"{self.sigla}"


class Subdireccion(models.Model):
        class Meta:
            verbose_name = "Subdirección"
            verbose_name_plural = "Subdirecciones"
            ordering = ('sigla', )

        nombre = models.CharField(max_length=255, unique=True)
        sigla = models.CharField(max_length=10, unique=True)

        ojects = models.Manager()

        def __str__(self):
            return f"{self.sigla}"
        

class Persona(models.Model):
    class Meta:
        verbose_name = "Persona"
        verbose_name_plural = "Personas"
        ordering = ('nombre', )

    nombre = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=255, null=False)    
    telefono = models.CharField(max_length=255, null=True, blank=True)
    institucion = models.ForeignKey(Institucion, on_delete=models.SET_NULL, null=True)
    subdireccion = models.ForeignKey(Subdireccion, on_delete=models.SET_NULL, null=True, blank=True)
    area = models.CharField(max_length=255, null=True, blank=True)
    cargo = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} - {self.institucion.sigla}"

  
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
    estado_options = (
        ('solicitud recibida', 'Solicitud recibida'),
        ('confección del protocolo', 'Confección del protocolo'),
        ('en curso', 'En curso'),
        ('finalizado', 'Finalizado'),
        ('rechazado', 'Rechazado'),
    )
    estado = models.CharField(max_length=50, choices=estado_options, default="solicitud recibida")

    # Respuesta SII
    oficio_respuesta = models.FileField(upload_to=respuesta_upload_path, max_length=500, null=True, blank=True)
    fecha_oficio_respuesta = models.DateField(null=True, blank=True)



    objects = models.Manager()
    queryobjects = ProyectoObjects()

    def __str__(self):
        return f"{self.institucion.sigla} - {self.nombre}"
