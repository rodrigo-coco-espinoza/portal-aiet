from rest_framework import serializers
from .models import *
from django.utils import timezone
import datetime


class InstitucionSelectSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Institucion
        fields = [
            "id",
            "full_name",
        ]

    def get_full_name(self, instance):
        return f"{instance.sigla} {instance.nombre}"
    

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'


class ProyectoActivoSerializer(serializers.ModelSerializer):
    encargado_sii = PersonaSerializer()
    backup_sii = PersonaSerializer()
    formatted_fecha_oficio_recibido = serializers.SerializerMethodField()
    formatted_fecha_oficio_respuesta = serializers.SerializerMethodField()

    def get_formatted_fecha_oficio_recibido(self, obj):
        
        formatted_date = obj.fecha_oficio_recibido.strftime('%d-%m-%Y') if obj.fecha_oficio_recibido else None
        return formatted_date
    

    def get_formatted_fecha_oficio_respuesta(self, obj):
        fecha_oficio_respuesta = obj.fecha_oficio_respuesta
        if fecha_oficio_respuesta:
            # Convert to datetime if it's a string
            if isinstance(fecha_oficio_respuesta, str):
                fecha_oficio_respuesta = timezone.make_aware(datetime.datetime.strptime(fecha_oficio_respuesta, "%Y-%m-%d"))
            formatted_date = fecha_oficio_respuesta.strftime('%d-%m-%Y')
        else:
            formatted_date = None
        return formatted_date

    class Meta:
        model = Proyecto
        fields = [
            'id',
            'nombre',
            'objetivo',
            'encargado_sii',
            'backup_sii',
            'oficio_recibido',
            'formatted_fecha_oficio_recibido',
            'gabinete',
            'estado',
            'oficio_respuesta',
            'formatted_fecha_oficio_respuesta'
        ]

class ProyectoNoActivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = [
            'id',
            'nombre',
            'estado'
        ]