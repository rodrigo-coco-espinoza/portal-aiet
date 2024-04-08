from django.contrib import admin
from .models import *

# Register your models here.

class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('id', 'institucion', 'nombre', 'encargado_sii', 'backup_sii', 'author', 'timestamp_creacion', 'estado', )
    list_per_page = 25

class InstitucionAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'sigla', 'rut', 'direccion', 'tipo', 'ministerio', )
    list_per_page = 25

class SubdireccionAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'sigla' )
    list_per_page = 25

class PersonaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'email', 'telefono', 'institucion', 'subdireccion', 'area', 'cargo' )
    list_per_page = 25

class RolAdmin(admin.ModelAdmin):
    list_display = ('id', 'proyecto', 'rol')
    list_per_page = 25

class JornadaAdmin(admin.ModelAdmin):
    list_display = ('id', 'proyecto', 'equipo', 'horario', 'dia')
    list_per_page = 25

admin.site.register(Proyecto, ProyectoAdmin)
admin.site.register(Institucion, InstitucionAdmin)
admin.site.register(Subdireccion, SubdireccionAdmin)
admin.site.register(Persona, PersonaAdmin)
admin.site.register(Rol, RolAdmin)
admin.site.register(Jornada, JornadaAdmin)