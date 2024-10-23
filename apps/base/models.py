from django.db import models

INSTITUCION_CHOICES = (
    ('empresa pública', 'Empresa pública'),
    ('ministerio', 'Ministerio'),
    ('municipalidad', 'Municipalidad'),
    ('servicio público', 'Servicio público'),
    ('privado', 'Privado'),
)


class Institucion(models.Model):
    class Meta:
        verbose_name = "Institución"
        verbose_name_plural = "Instituciones"
        ordering = ('sigla', )

    nombre = models.CharField(max_length=255, unique=True)
    sigla = models.CharField(max_length=255, unique=True)
    rut = models.CharField(max_length=12, null=True, blank=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)
    tipo = models.CharField(max_length=20, choices=INSTITUCION_CHOICES, default="servicio público")
    
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
    apellido = models.CharField(max_length=255, null=True, blank=True)
    rut = models.CharField(max_length=10, null=True, blank=True)
    email = models.CharField(max_length=255, null=False)
    telefono = models.CharField(max_length=255, null=True, blank=True)
    institucion = models.ForeignKey(Institucion, on_delete=models.SET_NULL, null=True)
    subdireccion = models.ForeignKey(Subdireccion, on_delete=models.SET_NULL, null=True, blank=True)
    area = models.CharField(max_length=255, null=True, blank=True)
    cargo = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.institucion.sigla}"
