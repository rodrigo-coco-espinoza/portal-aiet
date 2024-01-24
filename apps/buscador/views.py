from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Query, Nota
from apps.user.models import UserAccount
from.serializers import QuerySerializer, NotaSerializer
from django.conf import settings
from apps.user.serializers import *
import json
from django.http import JsonResponse

#User = settings.AUTH_USER_MODEL




class ListQueriesView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        queries = Query.queryobjects.all()
        if queries.exists():
            result = []
            for query in queries:
                query_data = QuerySerializer(query).data

                notas = Nota.notaobjects.filter(query=query)
                notas_data = NotaSerializer(notas, many=True).data
                query_data['notas'] = notas_data

                for nota in query_data['notas']:
                    nota_author = UserAccount.objects.filter(id=nota['author'])
                    nota_author_data = UserSerializer(nota_author, many=True).data
                    nota['author'] = nota_author_data

                author = UserAccount.objects.filter(id=query.author.id)
                author_data = UserSerializer(author, many=True).data
                query_data['author'] = author_data

                result.append(query_data)

            return Response({'queries': result}, status=status.HTTP_200_OK)
        else: 
            return Response({'error': 'No se han encontrado queries'}, status=status.HTTP_404_NOT_FOUND)
        

class ComboboxOptionsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        queries = Query.queryobjects.all()
        if queries.exists():
            result = [{
                'id': query.id,
                'name': query.nombre
            }
            for query in queries]
        
            return Response({'comboboxOptions': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron queries'}, status=status.HTTP_404_NOT_FOUND)
        

class EditQueryView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def put(self, request, format=None):
        data = json.loads(request.body)
        query = Query.queryobjects.get(id=data['id'])
        if query:
            query.nombre = data['nombre']
            query.texto = data['texto']
            query.save()

            result = QuerySerializer(query).data
            return Response({'queryActualizada': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se ha encontrado la query.'}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, format=None):
        data = json.loads(request.body)
        try:
            new_query = Query(
                nombre=data['nombre'],
                texto=data['texto'],
                author=request.user
            )
            new_query.save()
            result = QuerySerializer(new_query).data
            result['notas'] = []


            author = UserAccount.objects.filter(id=request.user.id)
            author_data = UserSerializer(author, many=True).data
            result['author'] = author_data
            return Response({'nuevaQuery': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteQueryView(APIView):
    permission_classes = (permissions.IsAuthenticated, )   

    def delete(self, request, id, format=None):

        query = Query.queryobjects.get(id=id)
        
        if query:
            query.delete()

            return Response({'queryEliminada': id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se ha encontrado la query.'}, status=status.HTTP_404_NOT_FOUND)


class DeleteNotaView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def delete(self, request, id, format=None):

        nota = Nota.notaobjects.get(id=id)
        query_id = nota.query.id
        
        if nota:
            nota.delete()

            return Response({
                    'notaID': id,
                    'queryID': query_id
                }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se ha encontrado la query.'}, status=status.HTTP_404_NOT_FOUND)
        
class AddNota(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        data = json.loads(request.body)
        try:
            query = Query.queryobjects.get(id=data['idQuery'])
            new_nota = Nota(
                texto=data['texto'],
                author=request.user,
                query=query,
                
            )
            new_nota.save()

            nota_author_data = UserSerializer(request.user, many=False).data
            nota_data = NotaSerializer(new_nota, many=False).data          
            nota_data['author'] = [nota_author_data]

            return Response({'nuevaNota': nota_data,
                             'idQuery': data['idQuery']}, status=status.HTTP_200_OK)
        
        except Exception as e:
            print(str(e))
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)