from rest_framework import serializers
from .models import *
from django.utils import timezone
import datetime

DIAS = {
    'lunes': 0,
    'martes': 1,
    'miércoles': 2,
    'jueves': 3,
    'viernes': 4,
}

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

    # Formato fehcas
    formatted_fecha_oficio_recibido = serializers.SerializerMethodField()
    formatted_fecha_oficio_respuesta = serializers.SerializerMethodField()
    formatted_fecha_inicio = serializers.SerializerMethodField()
    formatted_fecha_termino = serializers.SerializerMethodField()

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
    
    def get_formatted_fecha_inicio(self, obj):
        fecha_inicio = obj.fecha_inicio
        if fecha_inicio:
            if isinstance(fecha_inicio, str):
                fecha_inicio = timezone.make_aware(datetime.datetime.strptime(fecha_inicio, "%Y-%m-%d"))
            formatted_date = fecha_inicio.strftime('%d-%m-%Y')
        else:
            formatted_date = None
        return formatted_date
    
    def get_formatted_fecha_termino(self, obj):
        fecha_termino = obj.fecha_termino
        if fecha_termino:
            if isinstance(fecha_termino, str):
                fecha_termino = timezone.make_aware(datetime.datetime.strptime(fecha_termino, "%Y-%m-%d"))
            formatted_date = fecha_termino.strftime('%d-%m-%Y')
        else:
            formatted_date = None
        return formatted_date

    # Encargado e investigadores
    encargado = serializers.SerializerMethodField()
    investigadores = serializers.SerializerMethodField()

    def get_encargado(self, obj):
        encargado_instance = Rol.objects.filter(proyecto=obj, rol='encargado').first()
        if encargado_instance:
            return PersonaSerializer(encargado_instance.persona).data
        else:
            return None 
        
    def get_investigadores(self, obj):
        investigadores_instance = Rol.objects.filter(proyecto=obj, rol='investigador')
        if investigadores_instance:
            investigadores_data = [PersonaSerializer(investigador.persona).data for investigador in investigadores_instance]
            return investigadores_data
        else: 
            return []
    
    # Equipo y jornada
    equipo = serializers.SerializerMethodField()
    jornada = serializers.SerializerMethodField()

    def get_equipo(self, obj):
        jornada_instance = obj.jornada_set.first()
        if jornada_instance:
            return jornada_instance.equipo
        else:
            return None

    def get_jornada(self, obj):
        jornadas_instance = obj.jornada_set.all()
        if jornadas_instance:
            info = {
                'AM': [False] * 5,
                'PM': [False] * 5
            }

            for jornada in jornadas_instance:
                if jornada.horario == 'AM':
                    info['AM'][DIAS[jornada.dia]] = True
                elif jornada.horario == 'PM':
                    info['PM'][DIAS[jornada.dia]] = True
            return info                
        else:
            return {}
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
            'formatted_fecha_oficio_respuesta',
            'protocolo',
            'formatted_fecha_inicio',
            'formatted_fecha_termino',
            'encargado',
            'investigadores',
            'equipo',
            'jornada',
        ]

class ProyectoNoActivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = [
            'id',
            'nombre',
            'estado'
        ]