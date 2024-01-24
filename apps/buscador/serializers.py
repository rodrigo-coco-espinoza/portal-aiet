from rest_framework import serializers
from .models import *
from  apps.user.serializers import *


# class AuthorSerializer(serializers.ModelSerializer):
#     profile = UserSerializer(source='user', read_only=True)

#     class Meta:
#         model = User
#         fields = ['id', 'first_name', 'last_name', 'profile']



class QuerySerializer(serializers.ModelSerializer):
    # author = UserSerializer(read_only=True)

    class Meta:
        model = Query
        fields = [
            "id",
            "nombre",
            "texto",
            # "author"
        ]

    # def get_author(self, obj):
    #     selected_options = Query.objects.filter(
    #         optiongroup__question=obj).distinct()
    #     return UserSerializer(selected_options, many=True).data

class NotaSerializer(serializers.ModelSerializer):

    fecha_creacion = serializers.DateTimeField(read_only=True, format="%d-%m-%Y")

    class Meta:
        model = Nota
        fields = [
            "id",
            "texto",
            "fecha_creacion",
            "author"
        ]
    
# class AuthorQuerySerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Query
#         fields = [
#             "id",
#             "nombre",
#             "author"
#         ]