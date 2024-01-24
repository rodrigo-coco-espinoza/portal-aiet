from django.db import models
from django.db.models.query import QuerySet
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Query(models.Model):
    class Meta:
        verbose_name = "Query"
        verbose_name_plural = "Queries"
        ordering = ('nombre', )
    
    class QueryObjects(models.Manager):
        def get_queryset(self) -> QuerySet:
            return super().get_queryset().filter(status='publicado')

    nombre = models.CharField(max_length=255, unique=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True, blank=True)
    texto = models.TextField()

    options = (
        ('publicado', 'Publicado'),
        ('eliminado', 'Eliminado')
    )
    status = models.CharField(max_length=10, choices=options, default="publicado")
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    objects = models.Manager()
    queryobjects = QueryObjects()

    def __str__(self):
        return self.nombre

class Nota(models.Model):
    class Meta:
        verbose_name = "Nota"
        verbose_name_plural = "Notas"
        ordering = ('-fecha_creacion', )

    class NotaObjects(models.Manager):
        def get_queryset(self) -> QuerySet:
            return super().get_queryset().filter(status='publicado')

    

    query = models.ForeignKey(Query, related_name="notas_query", on_delete=models.CASCADE)
    texto = models.CharField(max_length=500)
    fecha_creacion = models.DateTimeField(auto_now_add=True, blank=True)

    options = (
        ('publicado', 'Publicado'),
        ('eliminado', 'Eliminado')
    )
    status = models.CharField(max_length=10, choices=options, default="publicado")
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    objects = models.Manager()
    notaobjects = NotaObjects()

    def __str__(self):
        return f"{self.fecha_creacion} - {self.texto}"
    