from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from apps.user.models import UserAccount
from django.conf import settings
from apps.user.serializers import *
from .serializers import InstitucionSelectSerializer,ProyectoActivoSerializer, ProyectoNoActivoSerializer
import json
from django.http import JsonResponse
from .models import *
from rest_framework.parsers import MultiPartParser, FormParser
import os
from django.utils.text import slugify
from django.shortcuts import get_object_or_404
from django.http import FileResponse
from .permissions import PcIslaPermissions
from django.db.models import Q
from django.utils import timezone
from datetime import datetime
# Create your views here.

DIAS_A_DIGITO = {
    'lunes': 0,
    'martes': 1,
    'miércoles': 2,
    'jueves': 3,
    'viernes': 4,
}

DIGITO_A_DIA = {
    0 :'lunes',
    1 :'martes',
    2 :'miércoles',
    3 :'jueves',
    4 :'viernes',
}

def obtener_bloques_ocupados():
    proyectos_instance = Proyecto.objects.filter(fecha_termino__gte=timezone.now()).exclude(Q(estado='finalizado') | Q(estado='rechazado'))

    bloques_ocupados = {
        'Bora Bora': {
            'am': [False] * 5,
            'pm': [False] * 5
        },

        'Rapa Nui': {
            'am': [False] * 5,
            'pm': [False] * 5
        },

        'Juan Fernández': {
            'am': [False] * 5,
            'pm': [False] * 5
        }
    }

    if proyectos_instance:

        for proyecto in proyectos_instance:
            jornadas_instance = Jornada.objects.filter(proyecto=proyecto)
            for jornada in jornadas_instance:
                equipo = jornada.equipo
                horario = jornada.horario
                dia_index = DIAS_A_DIGITO[jornada.dia]

                if horario == 'AM':
                    bloques_ocupados[equipo]['am'][dia_index] = True
                elif horario == 'PM':
                    bloques_ocupados[equipo]['pm'][dia_index] = True
    
    return bloques_ocupados

class AddProyecto(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        
        form_data = request.data

        # Obtener la instancia de la Institución
        institucion_id = form_data.get('institucion')
        institucion_instance = Institucion.objects.get(id=institucion_id)

        # Obtener instancias de encargado y backup
        encargadoSII_id = form_data.get('encargado')
        encargadoSII_instance = Persona.objects.get(id=encargadoSII_id)

        backupSII_id = form_data.get('backup')
        backupSII_instance = Persona.objects.get(id=backupSII_id)
    
        nuevo_proyecto = Proyecto.objects.create(
            institucion=institucion_instance,
            nombre=form_data.get('nombre').strip(),
            objetivo=form_data.get('objetivo').strip(),
            encargado_sii=encargadoSII_instance,
            backup_sii=backupSII_instance,
            oficio_recibido=form_data.get('documento'),
            fecha_oficio_recibido=form_data.get('fecha'),
            gabinete=form_data.get('gabinete').strip(),
            author=request.user,
            estado='solicitud recibida',  # You can set the initial state here
        )
        nuevo_proyecto.save()

        institucion_data = {
            'id_institucion': institucion_instance.id,
            'nombre_institucion': institucion_instance.nombre,
            'nombre_sigla': institucion_instance.sigla,
            'proyectos': []
        }

        proyectos = Proyecto.objects.filter(institucion=institucion_instance)
        for proyecto in proyectos: 
            if proyecto.estado in ['solicitud recibida', 'confección del documento', 'en curso']:
                        institucion_data['proyectos'].append(ProyectoActivoSerializer(proyecto).data)
            else:
                institucion_data['proyectos'].append(ProyectoNoActivoSerializer(proyecto).data)

        # Handle form_data and create a new project
        return Response({'nuevo_proyecto': institucion_data}, status=status.HTTP_200_OK)

class AddInstitucion(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        data = json.loads(request.body)
        try:
            ministerio = Institucion.objects.get(id=data['ministerio']) if data['ministerio'] else None

            nueva_institucion = Institucion(
                nombre=data['nombre'],
                sigla=data['sigla'],
                rut=data['rut'],
                direccion=data['direccion'],
                tipo=data['tipo'],
                ministerio=ministerio
            )
            nueva_institucion.save()
            nueva_institucion_data = InstitucionSelectSerializer(nueva_institucion, many=False).data

            return Response({'nuevaInstitucion': nueva_institucion_data,
                             'isMinisterio': True if data['tipo'] == 'ministerio' else False
                             }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListInstitucioneSelectView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        instituciones = Institucion.objects.all()
        ministerios = Institucion.objects.filter(tipo="ministerio")
        if instituciones.exists():
            resultInstituciones = [InstitucionSelectSerializer(institucion).data for institucion in instituciones]

            resultMinisterios = [InstitucionSelectSerializer(ministerio).data for ministerio in ministerios]

            resultMinisterios.insert(0, {"id": None, "full_name": "No aplica"})

            return Response({
                'institucionesOptions': resultInstituciones,
                'ministeriosOptions': resultMinisterios,
                }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se han encontrado instituciones.'}, status=status.HTTP_404_NOT_FOUND)
        
    
class ListProyectosView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        instituciones = Institucion.objects.all()
        data = []

        for institucion in instituciones:
            proyectos = Proyecto.objects.filter(institucion=institucion)

            if proyectos:
                institucion_data = {
                    'id_institucion': institucion.id,
                    'nombre_institucion': institucion.nombre,
                    'nombre_sigla': institucion.sigla,
                    'proyectos': []
                }

                for proyecto in proyectos:
                    if proyecto.estado in ['solicitud recibida', 'confección del protocolo', 'en curso']:
                        institucion_data['proyectos'].append(ProyectoActivoSerializer(proyecto).data)
                    else:
                        institucion_data['proyectos'].append(ProyectoNoActivoSerializer(proyecto).data)

                data.append(institucion_data)
        
        return Response({'proyectosInstituciones': data}, status=status.HTTP_200_OK)


class DownloadOficioRecibido(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, proyecto_id):
        proyecto = get_object_or_404(Proyecto, id=proyecto_id)

        try:
            response = FileResponse(proyecto.oficio_recibido.open('rb'))
            return response
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        

class ActualizarEncargadosSii(APIView):
    permission_classes = (PcIslaPermissions, )

    def patch(self, request, format=None):
        data = request.data
        try:
            proyecto = Proyecto.objects.get(id=data['proyectoId'])
            nuevo_encargado = Persona.objects.get(id=data['encargadoSii'])
            nuevo_backup = Persona.objects.get(id=data['backupSii'])          

            proyecto.encargado_sii = nuevo_encargado
            proyecto.backup_sii = nuevo_backup
            proyecto.save()

            result = ProyectoActivoSerializer(proyecto).data            

            return Response({'institucion': proyecto.institucion.id,
                             'proyectoActualizado': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class RechazarProyecto(APIView):
    permission_classes = (PcIslaPermissions, )

    def patch(self, request, format=None):
        data = request.data

        try:
            proyecto = Proyecto.objects.get(id=data['idProyecto'])
            proyecto.estado = "rechazado"
            proyecto.save()

            result = ProyectoNoActivoSerializer(proyecto).data
            return Response({'institucion': proyecto.institucion.id,
                             'proyectoRechazado': result}, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)
        

class AceptarProyecto(APIView):
    permission_classes = (PcIslaPermissions, )
    parser_classes = [MultiPartParser, FormParser]
    
    def patch(self, request, format=None):
        data = request.data

        try: 
            proyecto = Proyecto.objects.get(id=data['id'])
            proyecto.oficio_respuesta = data['documento']
            proyecto.fecha_oficio_respuesta = data['fecha']
            proyecto.estado = "confección del protocolo"
            proyecto.save()

            result = ProyectoActivoSerializer(proyecto).data
            return Response({'institucion': proyecto.institucion.id,
                             'proyectoAceptado': result}, status=status.HTTP_200_OK)
        
        except Exception as e:
            print(str(e))
            return Response({'error': str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)


class DownloadOficioRespuesta(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, proyecto_id):
        proyecto = get_object_or_404(Proyecto, id=proyecto_id)

        try:
            response = FileResponse(proyecto.oficio_respuesta.open('rb'))
            return response
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class ListsPersonasInstitucion(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, institucion_id):
        try:         
            personas = Persona.objects.filter(institucion_id=institucion_id)
            result = PersonaSerializer(personas, many=True)
            return Response({'personasInstitucion': result.data}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request, institucion_id):
        try:
            data = request.data
            institucion_instance = Institucion.objects.get(id=institucion_id)
            persona = Persona(
                nombre=data['nombre'].strip(),
                email=data['email'],
                telefono=data['telefono'] if data['telefono'] != "" else None,
                area=data['area']  if data['area'] != "" else None,
                cargo=data['cargo']  if data['cargo'] != "" else None,
                institucion=institucion_instance
            )
            persona.save()

            result = PersonaSerializer(persona).data

            return Response({'nuevaPersona': result}, status=status.HTTP_200_OK)
        except Exception as e:
            print(str(e))
            return Response({'error': str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)
        

class BloquesOcupados(APIView):
    permission_classes = (PcIslaPermissions, )

    def get(self, request, *args, **kwargs):
        
        bloques_ocupados = obtener_bloques_ocupados()
            
        return Response({'bloquesOcupados': bloques_ocupados}, status=status.HTTP_200_OK)


class AddProtocolo(APIView):
    permission_classes = (PcIslaPermissions, )
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        

        try:
            data = request.data
            
            # Agregar info al proyecto
            proyecto = Proyecto.objects.get(id=data['proyectoId'])
            proyecto.protocolo = data['documento']
            proyecto.fecha_inicio = data['fecha_inicio']
            proyecto.fecha_termino = data['fecha_termino']
            proyecto.save()

            # Agregar encargado e investigadores
            encargado_instance = Persona.objects.get(id=data['encargado'])
            nuevo_encargado = Rol.objects.create(
                proyecto=proyecto,
                persona=encargado_instance,
                rol='encargado'
            )
            nuevo_encargado.save()

            for investigador_id in data['investigadores']: 
                investigador_instance = Persona.objects.get(id=investigador_id)
                nuevo_investigador = Rol.objects.create(
                    proyecto=proyecto,
                    persona=investigador_instance,
                    rol='investiagador'
                )
                nuevo_investigador.save()

            # Agregar jornadas
            for dia in data['jornada']['am']:
                nueva_jornada = Jornada.objects.create(
                    proyecto=proyecto,
                    equipo=data['equipo'],
                    horario='AM',
                    dia=DIGITO_A_DIA[dia]
                )

                nueva_jornada.save()

            # Resultado
            proyecto_result = ProyectoActivoSerializer(proyecto).data
            bloques_ocupados = obtener_bloques_ocupados()

            return Response({'proyecto_actualizado': proyecto_result,
                             'bloquesOcupados': bloques_ocupados,
                             'id_institucion': proyecto.institucion.id}, status=status.HTTP_200_OK)
        except Exception as e:
            print(str(e))
            return Response({'error': str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)


