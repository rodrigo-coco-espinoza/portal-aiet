from rest_framework import serializers

from apps.pc_isla.models import Institucion, Persona
from apps.base.utils import obtener_apellido
from .models import *


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


class PersonaSelectSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()

    class Meta:
        model = Institucion
        fields = [
            "id",
            "full_name",
        ]

    def get_full_name(self, instance):
        return f"{instance.persona.nombre.split()[0]} {obtener_apellido(instance.persona)}"

    def get_id(self, instance):
        return instance.persona.id


class PersonaSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField()
    nombre_corto = serializers.SerializerMethodField()

    def get_nombre_completo(self, obj):
        return f"{obj.nombre.split()[0]} {obtener_apellido(obj)}"

    def get_nombre_corto(self, obj):
        nombre = obj.nombre.split()[0]
        return f"{nombre[0]}. {obtener_apellido(obj)}"

    class Meta:
        model = Persona
        fields = [
            'id',
            'nombre',
            'apellido',
            'nombre_completo',
            'nombre_corto',
            'rut',
            'email',
            'telefono',
            'institucion',
            'subdireccion',
            'area',
            'cargo',
        ]


class InstitucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institucion
        fields = [
            'id',
            'nombre',
            'sigla',
            'rut',
            'direccion',
            'tipo',
            'ministerio',
        ]