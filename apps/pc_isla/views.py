from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from apps.user.models import UserAccount
from django.conf import settings
from apps.user.serializers import *
from .serializers import InstitucionSelectSerializer,ProyectoActivoSerializer, ProyectoNoActivoSerializer, PersonaSelectSerializer
import json
from django.http import JsonResponse
from .models import *
from rest_framework.parsers import MultiPartParser, FormParser
import os
from django.utils.text import slugify
from django.shortcuts import get_object_or_404
from django.http import FileResponse
from .permissions import PcIslaPermissions, InvestigadorPermissions
from django.db.models import Q, Max
from django.utils import timezone
from datetime import datetime, date, timedelta
from holidays import Chile
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

# Create your views here.

DIAS_A_DIGITO = {
    'lunes': 0,
    'martes': 1,
    'miércoles': 2,
    'jueves': 3,
    'viernes': 4,
}

DIGITO_A_DIA = {
    '0' :'lunes',
    '1' :'martes',
    '2' :'miércoles',
    '3' :'jueves',
    '4' :'viernes',
}

JORNADAS_HACIENDA = [
    'lunes[AM]',
    'lunes[PM]',
    'martes[AM]',
    'martes[PM]',
    'miércoles[AM]',
    'miércoles[PM]',
    'jueves[AM]',
    'jueves[PM]',
    'viernes[AM]',
    'viernes[PM]',
]

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
            jornadas_instance = Jornada.objects.filter(proyecto=proyecto, extra=0, active=1)
            for jornada in jornadas_instance:
                equipo = jornada.equipo
                horario = jornada.horario
                dia_index = DIAS_A_DIGITO[jornada.dia]

                if horario == 'AM':
                    bloques_ocupados[equipo]['am'][dia_index] = True
                elif horario == 'PM':
                    bloques_ocupados[equipo]['pm'][dia_index] = True
    
    return bloques_ocupados

def obtener_jornada_minhacienda():
    # Estructura datos de respuesta
    data = {
        'proyectos': [],
        'horario': [
            {'dia': 'lunes', 'AM': None, 'PM': None},
            {'dia': 'martes', 'AM': None, 'PM': None},
            {'dia': 'miércoles', 'AM': None, 'PM': None},
            {'dia': 'jueves', 'AM': None, 'PM': None},
            {'dia': 'viernes', 'AM': None, 'PM': None},
        ]
    }

    # Proyectos de MINHACIENDA
    institucion = Institucion.objects.get(sigla="MINHACIENDA")
    proyectos = Proyecto.objects.filter(
        institucion=institucion,
        ).exclude(
            Q(protocolo='') | Q(estado='finalizado') | Q(estado='rechazado')
        )

    # Agregar proyectos activos
    for proyecto in proyectos:
        data['proyectos'].append({
            'id': proyecto.id,
            'nombre': proyecto.nombre
        })
    
    # Obtener las jornadas los proyectos
    jornadas = Jornada.objects.filter(proyecto__in=proyectos, extra=0, active=1)
    for jornada in jornadas:
        for item in data['horario']:
            if item['dia'] == jornada.dia:
                item[jornada.horario] = jornada.proyecto.id
                break

    return data

def get_calendario():
    calendario = []

    # Obtener todos los proyectos activos
    proyectos_activos = Proyecto.objects.filter(estado='en curso')
    # Obtener las jornadas de esos proyectos
    jornadas = Jornada.objects.filter(proyecto__in=proyectos_activos, active=1)

    # Fecha inicio y término del calendario
    fecha_actual = datetime.now().date()
    inicio = fecha_actual - timedelta(days=fecha_actual.weekday() + 1)
    fin = inicio + timedelta(days=30)
    while fin.weekday() != 4:  # 4 representa el viernes
        fin += timedelta(days=1)

    feriados = Chile()

    cuenta_dia = inicio

    # Generar los días del calendario
    while cuenta_dia <= fin:
        # Agregar solo días laborales
        dia_int = cuenta_dia.weekday()

        if dia_int < 5:

            calendario.append({
                'dia': DIGITO_A_DIA[str(dia_int)].capitalize(),
                'fecha': cuenta_dia.strftime("%d-%m-%Y"),
                'feriado': cuenta_dia in feriados,
                'pasado': False,
                'Bora Bora': {
                    'AM': {
                        'institucion': None,
                        'proyecto': None,
                        'extra': False,
                        'asistencia': False,
                    },
                    'PM': {
                        'institucion': None,
                        'proyecto': None,
                        'extra': False,
                        'asistencia': False,
                    }
                },
                'Rapa Nui': {
                    'AM': {
                        'institucion': None,
                        'proyecto': None,
                        'extra': False,
                        'asistencia': False,
                    },
                    'PM': {
                        'institucion': None,
                        'proyecto': None,
                        'extra': False,
                        'asistencia': False,
                    }
                },
                'Juan Fernández': {
                    'AM': {
                        'institucion': None,
                        'proyecto': None,
                        'extra': False,
                        'asistencia': False,
                    },
                    'PM': {
                        'institucion': None,
                        'proyecto': None,
                        'extra': False,
                        'asistencia': False,
                    }
                },

            })

    
        cuenta_dia += timedelta(days=1)

    # Rellenar el calendario con las jornada
    for jornada in jornadas:

        for dia_calendario in calendario:
            fecha_calendario = datetime.strptime(dia_calendario['fecha'],"%d-%m-%Y").date() 
            
            # Identificar jornada extra
            if jornada.extra and fecha_calendario == jornada.fecha:
                dia_calendario[jornada.equipo][jornada.horario]['extra'] = True
                dia_calendario[jornada.equipo][jornada.horario]['institucion'] = jornada.proyecto.institucion.sigla
                dia_calendario[jornada.equipo][jornada.horario]['proyecto'] = jornada.proyecto.nombre
                
            # Identificar días pasados
            if fecha_calendario < fecha_actual:
                dia_calendario['pasado'] = True
            
            if not jornada.extra and  jornada.dia.capitalize() == dia_calendario['dia'] and jornada.proyecto.fecha_inicio <= fecha_calendario and jornada.proyecto.fecha_termino >= fecha_calendario:
                dia_calendario[jornada.equipo][jornada.horario]['institucion'] = jornada.proyecto.institucion.sigla
                dia_calendario[jornada.equipo][jornada.horario]['proyecto'] = jornada.proyecto.nombre
                # Identificar días pasados
                if fecha_calendario < fecha_actual:
                    dia_calendario['pasado'] = True

            #Identificar asistencia del día
            if fecha_calendario <= fecha_actual:
                asistencia = Asistencia.objects.filter(jornada=jornada, fecha=fecha_calendario).first()
                if asistencia and asistencia.datetime_ingreso:
                    dia_calendario[jornada.equipo][jornada.horario]['asistencia'] = True
                
    
    return calendario

def obtener_asistencias(persona):
    proyectos_encargado = Rol.objects.filter(
        persona=persona,
        rol='encargado',
        proyecto__estado='en curso'
    ).values_list('proyecto_id', flat=True)
    asistencias_del_dia = Asistencia.objects.filter(
        jornada__proyecto_id__in=proyectos_encargado,
        fecha=date.today()
    )

    data = []
    for asistencia in asistencias_del_dia:
        ingreso_hhmm = asistencia.datetime_ingreso.split()[1] if asistencia.datetime_ingreso else None
        salida_hhmm = asistencia.datetime_salida.split()[1] if asistencia.datetime_salida else None

        # Investigadores
        investigadores = asistencia.jornada.proyecto.rol_set.all()

        data.append({
            'id': asistencia.id,
            'codigo': asistencia.jornada.proyecto.id,
            'sigla': asistencia.jornada.proyecto.institucion.sigla,
            'nombre': asistencia.jornada.proyecto.nombre,
            'dia': asistencia.jornada.dia.capitalize(),
            'fecha': asistencia.fecha.strftime('%d-%m-%Y'),
            'equipo': asistencia.jornada.equipo,
            'jornada': asistencia.jornada.horario,
            'ingreso': ingreso_hhmm,
            'salida': salida_hhmm,
            'extra': True if asistencia.jornada.extra else False,
            'investigadores': PersonaSelectSerializer(investigadores, many=True).data
        })

    return data
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
        

class BloquesOcupados(APIView
):
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
            
            # # Agregar info al proyecto
            proyecto = Proyecto.objects.get(id=data['proyectoId'])
            proyecto.protocolo = data['documento']
            proyecto.fecha_inicio = data['fecha_inicio']
            proyecto.fecha_termino = data['fecha_termino']
            proyecto.estado = 'en curso'
            proyecto.save()

            # Agregar encargado e investigadores
            encargado_instance = Persona.objects.get(id=data['encargado'])
            nuevo_encargado = Rol.objects.create(
                proyecto=proyecto,
                persona=encargado_instance,
                rol='encargado'
            )
            nuevo_encargado.save()

            investigadores = data.getlist('investigadores[]')

            for investigador_id in investigadores: 
                investigador_instance = Persona.objects.get(id=investigador_id)
                nuevo_investigador = Rol.objects.create(
                    proyecto=proyecto,
                    persona=investigador_instance,
                    rol='investigador'
                )
                nuevo_investigador.save()

            # Agregar jornadas
            jornada_am = data.getlist('jornada_am[]')
            jornada_pm = data.getlist('jornada_pm[]')
                            
            for dia in jornada_am:
                nueva_jornada = Jornada.objects.create(
                    proyecto=proyecto,
                    equipo=data['equipo'],
                    horario='AM',
                    dia=DIGITO_A_DIA[dia]
                )
                nueva_jornada.save()
            
            for dia in jornada_pm:
                nueva_jornada = Jornada.objects.create(
                    proyecto=proyecto,
                    equipo=data['equipo'],
                    horario='PM',
                    dia=DIGITO_A_DIA[dia]
                )
                nueva_jornada.save()

            # Agregar asistencias
            feriados = Chile()
            jornadas = Jornada.objects.filter(proyecto=proyecto, active=1, extra=0)
            for jornada in jornadas:
                current_date = datetime.strptime(proyecto.fecha_inicio,"%Y-%m-%d").date()
                end_date = datetime.strptime(proyecto.fecha_termino,"%Y-%m-%d").date()
                
                while current_date <= end_date:
                    if current_date.weekday() == DIAS_A_DIGITO[jornada.dia] and current_date not in feriados:
                        nueva_asistencia = Asistencia.objects.create(
                            jornada=jornada,
                            fecha=current_date
                        )
                        nueva_asistencia.save()

                    current_date += timedelta(days=1)



            #Resultado
            proyecto_result = ProyectoActivoSerializer(proyecto).data
            bloques_ocupados = obtener_bloques_ocupados()
            if proyecto.institucion.sigla == "MINHACIENDA":
                jornada_minhacienda = obtener_jornada_minhacienda()
            else:
                jornada_minhacienda = None

            
            # Actualizar calendario
            calendario = get_calendario()

            return Response({'proyecto_actualizado': proyecto_result,
                             'bloquesOcupados': bloques_ocupados,
                             'id_institucion': proyecto.institucion.id,
                             'jornada_minhacienda': jornada_minhacienda,
                             'calendario': calendario}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)


class DownloadProtocolo(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, proyecto_id):
        proyecto = get_object_or_404(Proyecto, id=proyecto_id)

        try:
            response = FileResponse(proyecto.protocolo.open('rb'))
            return response
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class JornadaMinhacienda(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]  # Apply different permissions for GET
        else:
            return [PcIslaPermissions()]  # Apply different permissions for other methods


    def get(self, request):

        data = obtener_jornada_minhacienda()
        return Response({'jornadas_minhacienda': data}, status=status.HTTP_200_OK)

        

    def patch(self, request):
        try:
            data = request.data

            # Obtener las jornadas actuales
            institucion = Institucion.objects.get(sigla="MINHACIENDA")
            proyectos_activos = Proyecto.objects.filter(institucion=institucion).exclude(Q(estado='finalizado') | Q(estado='rechazado'))
            jornadas_actuales = Jornada.objects.filter(proyecto__in=proyectos_activos, extra=0, active=1)

            # Desactivar las jornadas actuales
            jornadas_actuales.update(active=0)

            # Ingresar nueva jornadas
            data = self.request.data
            for jornada in JORNADAS_HACIENDA:
                try:
                    # Agregar nueva jornada
                    proyecto = Proyecto.objects.get(id=data[jornada])
                    
                    dia_horario = jornada.split("[")
                    dia = dia_horario[0]
                    horario = dia_horario[1].rstrip("]")

                    nueva_jornada = Jornada.objects.create(
                        proyecto=proyecto,
                        equipo='Juan Fernández',
                        dia=dia,
                        horario=horario,
                    )
                    nueva_jornada.save()

                except Exception as e:
                    print(f'Error: {e}')   

            # Eliminar asistencias futuras
            dia_actual = datetime.now().date()
            asistencias_actuales = Asistencia.objects.filter(
                jornada__proyecto__in=proyectos_activos,
                fecha__gte=dia_actual,
                datetime_ingreso__isnull=True
            )
            asistencias_actuales.delete()



            # Agregar nuevas asistencias
            feriados = Chile()
            jornadas = Jornada.objects.filter(proyecto__in=proyectos_activos, extra=0, active=1)
            for jornada in jornadas:
                current_date = datetime.now().date() 
                end_date = jornada.proyecto.fecha_termino 
                while current_date <= end_date:
                    if current_date.weekday() == DIAS_A_DIGITO[jornada.dia] and current_date not in feriados:
                        nueva_asistencia = Asistencia.objects.create(
                            jornada=jornada,
                            fecha=current_date
                        )
                        nueva_asistencia.save()

                    current_date += timedelta(days=1)
      

            # Actualizar proyectos activos Hacienda
            proyectos_minhacienda = {}
            proyectos = Proyecto.objects.filter(institucion=institucion)
            if proyectos:
                proyectos_minhacienda = {
                    'id_institucion': institucion.id,
                    'nombre_institucion': institucion.nombre,
                    'nombre_sigla': institucion.sigla,
                    'proyectos': []
                }
                
                for proyecto in proyectos:
                    if proyecto.estado in ['solicitud recibida', 'confección del protocolo', 'en curso']:
                        proyectos_minhacienda['proyectos'].append(ProyectoActivoSerializer(proyecto).data)
                    else:
                        proyectos_minhacienda['proyectos'].append(ProyectoNoActivoSerializer(proyecto).data)

            # Actualizar bloques ocupados
            calendario = get_calendario()
            # Actualizar jornadas Hacienda
            jornadas_minhacienda = obtener_jornada_minhacienda()

            return Response({'proyectos_minhacienda': proyectos_minhacienda,
                             'calendario': calendario,
                             'jornadas_minhacienda': jornadas_minhacienda}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)
        

class HorarioPcIsla(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        calendario = get_calendario()
        if type(calendario) == TypeError:
            return Response({'error': str(calendario)}, status=status.HTTP_501_NOT_IMPLEMENTED)
        else:
            return Response({'calendario': calendario}, status=status.HTTP_200_OK)
        
        
class AsistenciaList(APIView):
    permission_classes = (InvestigadorPermissions, )

    def get(self, request):
        data = obtener_asistencias(request.user.persona)
        return Response ({'asistencia': data}, status=status.HTTP_200_OK)


class RegistrarIngreso(APIView):
    permission_classes = (InvestigadorPermissions, )

    def post(self, request, format=None):
        data = request.data
        asistencia = Asistencia.objects.get(id=data['id_asistencia'])
        now = datetime.now()
        formatted_datetime = now.strftime("%d/%m/%Y %H:%M") 
        asistencia.datetime_ingreso = formatted_datetime
        asistencia.save()

        respuesta = obtener_asistencias(request.user.persona)
        return Response({'asistencias': respuesta}, status=status.HTTP_200_OK)


class RegistrarSalida(APIView):
    permission_classes = (InvestigadorPermissions, )

    def patch(self,request, format=None):
        data = request.data
        asistencia = Asistencia.objects.get(id=data['id_asistencia'])
        now = datetime.now()
        formatted_datetime = now.strftime("%d/%m/%Y %H:%M") 
        asistencia.datetime_salida = formatted_datetime
        asistencia.motivo_salida = data['motivo']
        asistencia.save()

        respuesta = obtener_asistencias(request.user.persona)
        return Response({'asistencias': respuesta}, status=status.HTTP_200_OK)

