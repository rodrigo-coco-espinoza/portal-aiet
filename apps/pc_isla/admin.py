from django.contrib import admin

from .models import *

# Register your models here.

class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('id', 'institucion', 'nombre', 'encargado_sii', 'backup_sii', 'author', 'timestamp_creacion', 'extendido', 'estado', )
    list_per_page = 25


class RolAdmin(admin.ModelAdmin):
    list_display = ('id', 'proyecto', 'rol', 'persona')
    list_per_page = 25


class AsistenciaAdmin(admin.ModelAdmin):
    
    # Create a custom value for proyecto field
    def short_proyecto(self, obj):
        return f"{obj.proyecto.id} {obj.proyecto.institucion.sigla}"
    short_proyecto.short_description = "Proyecto"
    short_proyecto.admin_order_field = 'proyecto'



    list_display = ('id', 'short_proyecto', 'equipo', 'horario', 'fecha', 'datetime_ingreso', 'datetime_salida', 'tipo', 'motivo_salida')
    list_per_page = 25


class AsistenciaInvestigadorAdmin(admin.ModelAdmin):

    list_display = ('id', 'asistencia', 'investigador')
    list_per_page = 25

admin.site.register(Proyecto, ProyectoAdmin)


admin.site.register(Rol, RolAdmin)
# admin.site.register(Jornada, JornadaAdmin)
admin.site.register(Asistencia, AsistenciaAdmin)
admin.site.register(AsistenciaInvestigador, AsistenciaInvestigadorAdmin) 