from django.contrib import admin
from .models import *

class QueryAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', )
    list_display_links = ('nombre', )
    list_per_page = 25


class NotaAdmin(admin.ModelAdmin):
    list_display = ('id', 'texto', )
    list_display_links = ('texto', )
    list_per_page = 25

admin.site.register(Query, QueryAdmin)
admin.site.register(Nota, NotaAdmin)