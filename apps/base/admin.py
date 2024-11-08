from django.contrib import admin

from apps.base.models import Persona, Subdireccion, Institucion

class InstitucionAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'sigla', 'rut', 'direccion', 'tipo', 'ministerio', )
    list_per_page = 25

class SubdireccionAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'sigla' )
    list_per_page = 25

class PersonaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'apellido', 'email', 'institucion', 'subdireccion', 'area', 'cargo' )
    list_per_page = 25


admin.site.register(Institucion, InstitucionAdmin)
admin.site.register(Subdireccion, SubdireccionAdmin)
admin.site.register(Persona, PersonaAdmin)


