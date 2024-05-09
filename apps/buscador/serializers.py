from rest_framework import serializers
from .models import *
from  apps.user.serializers import *


class QuerySerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Query
        fields = [
            "id",
            "nombre",
            "texto",
            "author",
        ]

class NotaSerializer(serializers.ModelSerializer):

    fecha_creacion = serializers.DateTimeField(read_only=True, format="%d-%m-%Y")
    author = UserSerializer()
    class Meta:
        model = Nota
        fields = [
            "id",
            "texto",
            "fecha_creacion",
            "author"
        ]
