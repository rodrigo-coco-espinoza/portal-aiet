from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.pc_isla.serializers import PersonaSerializer

User = get_user_model()

class UserSerializer(UserCreateSerializer):
    persona = PersonaSerializer()  # Use your PersonaSerializer to serialize the related Persona
    
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            'id',
            'username',
            'is_active',
            'is_staff',
            'is_pc_isla_editor',
            'is_pc_isla_admin',
            'is_pc_isla_investigador',
            'is_convenios_editor',
            'is_convenios_admin',
            'is_buscador_editor',
            'is_buscador_admin',
            'persona',  # Include serialized Persona information
        ]

class EncargadosPcIslaSerializer(UserCreateSerializer):
    full_name = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        persona_instance = obj.persona
        return PersonaSerializer(persona_instance).data['nombre']
    
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            'id',
            'full_name'
        ]