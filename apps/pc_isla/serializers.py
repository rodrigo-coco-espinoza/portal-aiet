from rest_framework import serializers

from apps.base.serializers import PersonaSerializer
from apps.base.utils import obtener_apellido, capitalize_first, extraer_hora_de_fecha, calcular_minutos_entre_horas, minutos_a_hhmm
from .models import *
from django.utils import timezone
import datetime
from operator import itemgetter
from django.db.models.functions import TruncMonth
from math import trunc


DIAS = {
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

DIAS_ENG_A_ESP = {
    'monday': 'lunes',
    'tuesday': 'martes',
    'wednesday': 'miércoles',
    'thursday': 'jueves',
    'friday': 'viernes',
}



MESES_NOMBRE = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

INICIO_JORNADA_AM = datetime.time(9,0)
FIN_JORNADA_AM = datetime.time(12, 30)
INICIO_JORNADA_PM = datetime.time(14, 30)
FIN_JORNADA_PM = datetime.time(17, 0)

def cacular_estadisticas_de_asistencia_del_mes(asistencias):
    
    jornadas_del_mes_cuenta = asistencias.count()
    asistencias_del_mes = asistencias.exclude(datetime_ingreso="").exclude(datetime_ingreso__isnull=True)
    asistencias_del_mes_cuenta = asistencias_del_mes.count()

    minutos_utilizados = 0
    minutos_extra = 0

    horas_asignadas = 0

    if asistencias_del_mes:
        for asistencia in asistencias_del_mes:
            hora_minuto_string = extraer_hora_de_fecha(asistencia.datetime_ingreso)
            hora_minuto_ingreso = hora_minuto_string.split(":")
            hora_ingreso = datetime.time(int(hora_minuto_ingreso[0]), int(hora_minuto_ingreso[1])
            )
            
            if asistencia.datetime_salida:
                hora_minuto_string = extraer_hora_de_fecha(asistencia.datetime_salida)
                hora_minuto_salida = hora_minuto_string.split(":")
                hora_salida = datetime.time(int(hora_minuto_salida[0]), int(hora_minuto_salida[1]))
            else: 
                hora_salida = datetime.time(17, 0)

            
            # Calcular tiempo de uso
            minutos = calcular_minutos_entre_horas(hora_ingreso, hora_salida)
            

            
            # Calcular tiempo extra
            extra = 0
            if asistencia.horario == "AM":          
                
                if hora_ingreso < INICIO_JORNADA_AM:
                    extra += calcular_minutos_entre_horas(hora_ingreso, INICIO_JORNADA_AM)
                if hora_salida > FIN_JORNADA_AM:
                    extra += calcular_minutos_entre_horas(FIN_JORNADA_AM, hora_salida)
                
                if minutos > 180:
                    minutos_utilizados += 180
                else:
                    minutos_utilizados += minutos

            elif asistencia.horario == "PM":

                # Calcular tiempo extra
                if hora_ingreso < INICIO_JORNADA_PM:
                    extra += calcular_minutos_entre_horas(hora_ingreso, INICIO_JORNADA_PM)
                if hora_salida > FIN_JORNADA_PM:
                    extra += calcular_minutos_entre_horas(FIN_JORNADA_PM, hora_salida)
                
                if minutos > 150:
                    minutos_utilizados += 150
                else:
                    minutos_utilizados += minutos
            
            minutos_extra += extra

    for asistencia in asistencias:
        if asistencia.horario == "AM":
            horas_asignadas += 3
        elif asistencia.horario == "PM":
            horas_asignadas += 2.5
  
    
    return {
        'mes': MESES_NOMBRE[asistencias.first().fecha.month - 1],
        'asistencia': asistencias_del_mes_cuenta,
        'jornadasAsignadas': jornadas_del_mes_cuenta,
        'porcentajeAsistencia': trunc((asistencias_del_mes_cuenta / jornadas_del_mes_cuenta) * 100),
        'horasUtilizadas': round(minutos_utilizados / 60, 1),
        'horasAsignadas': horas_asignadas,
        'horasExtra': minutos_a_hhmm(minutos_extra),
        'para_totales': {
            'minutos': minutos_utilizados,
            'extra': minutos_extra,
            'jornadas_del_mes': jornadas_del_mes_cuenta,
            'asistencias_del_mes': asistencias_del_mes_cuenta,
            'horas_asignadas_del mes': horas_asignadas

        }
    }

def obtener_asistencia_total_proyecto(proyecto, mes):

    fecha = datetime.date.today()
    if mes != fecha.month:
        if 7 <= mes - fecha.month <= 11:
            fecha = datetime.date(fecha.year - 1, mes, 1) + datetime.timedelta(days=31)
        else:
            fecha = datetime.date(fecha.year, mes, 1) + datetime.timedelta(days=31)
        fecha = fecha.replace(day=1) - datetime.timedelta(days=1)

            
    asistencias = Asistencia.objects.filter(
        proyecto=proyecto,       
        fecha__lte=fecha,
        tipo__in=['regular', 'recuperacion']
    )

    info_mensual = []

    jornadas_total = 0
    asistencias_total = 0
    minutos_utilizados_total = 0
    minutos_extra_total = 0
    horas_asignadas_total = 0


    meses_asistencias = asistencias.annotate(month=TruncMonth('fecha')).values('month').distinct()
    for mes in meses_asistencias:
        mes_id = mes['month'].month
        asistencias_del_mes = asistencias.filter(fecha__month=mes_id)
        data_mes = cacular_estadisticas_de_asistencia_del_mes(asistencias_del_mes)

        # Actualizar totales
        horas_asignadas_total += data_mes['para_totales']['horas_asignadas_del mes']
        jornadas_total += data_mes['para_totales']['jornadas_del_mes']
        asistencias_total += data_mes['para_totales']['asistencias_del_mes']
        minutos_utilizados_total += data_mes['para_totales']['minutos']
        minutos_extra_total += data_mes['para_totales']['extra']

        # Eliminar para_totales
        data_mes.pop('para_totales')
        info_mensual.append(data_mes)

    if asistencias:

        info_total = {
            'porcentajeAsistenciaTotal': trunc((asistencias_total / jornadas_total) * 100),
            'usoHorasAsignadasTotal': trunc((minutos_utilizados_total / 60) / horas_asignadas_total * 100),
            'horasExtraTotal': f"{minutos_a_hhmm(minutos_extra_total)}"
        }

    else:
        info_total = {
            'porcentajeAsistenciaTotal': None,
            'usoHorasAsignadasTotal': None,
            'horasExtraTotal': None
        }

    return {
        'mensual': info_mensual,
        'total': info_total
    }

def obtener_investigadores_asistentes(asistencia):
    investigadores = asistencia.asistenciainvestigador_set.all()
    asistentes = []
    for investigador in investigadores:
        nombre = investigador.investigador.nombre.split()[0]
        asistentes.append(f"{nombre[0]}. {obtener_apellido(investigador.investigador)}")
    return ', '.join(asistentes)

class ProyectoActivoSerializer(serializers.ModelSerializer):
    encargado_sii = PersonaSerializer()
    backup_sii = PersonaSerializer()

    # Formato fechas
    formatted_fecha_oficio_recibido = serializers.SerializerMethodField()
    formatted_fecha_oficio_respuesta = serializers.SerializerMethodField()
    formatted_fecha_inicio = serializers.SerializerMethodField()
    formatted_fecha_termino = serializers.SerializerMethodField()
    formatted_fecha_extension = serializers.SerializerMethodField()

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
        if obj.institucion.sigla == "MINHACIENDA":
            return 'Juan Fernández'
        else:
            asistencia_instance = obj.asistencia_set.filter(tipo="regular").first()
            # jornada_instance = obj.jornada_set.filter(extra=0, active=1).first()
            if asistencia_instance:
                return asistencia_instance.equipo
            else:
                return None

    def get_jornada(self, obj):

        asistencias_instance = Asistencia.objects.filter(proyecto=obj, tipo='regular')
        if asistencias_instance:
            info = {
                'AM': [False] * 5,
                'PM': [False] * 5
            }

            for asistencia in asistencias_instance:
                if asistencia.horario == 'AM':
                     
                    info['AM'][asistencia.fecha.weekday()] = True
                elif asistencia.horario == 'PM':
                    info['PM'][asistencia.fecha.weekday()] = True
            return info                
        else:
            return {
                'AM': [False] * 5,
                'PM': [False] * 5
                }
        
    # Asistencia
    asistencia = serializers.SerializerMethodField()
    def get_asistencia(self, obj):
        data = []
        asistencias_pasadas = Asistencia.objects.filter(
            proyecto=obj,
            fecha__lte=datetime.date.today()
        ).order_by('fecha')
        
        for asistencia in asistencias_pasadas:
            data.append({
                'jornada': f'{DIGITO_A_DIA[str(asistencia.fecha.weekday())].capitalize()} {asistencia.horario}',
                'fecha': asistencia.fecha.strftime('%d-%m-%Y'),
                'ingreso': extraer_hora_de_fecha(asistencia.datetime_ingreso),
                'salida': extraer_hora_de_fecha(asistencia.datetime_salida),
                'motivo': capitalize_first(asistencia.motivo_salida),
                'tipo': asistencia.tipo,
            })

        return data
    
    # Extendido
    def get_formatted_fecha_extension(self, obj):
        fecha_extension = obj.fecha_extension
        if fecha_extension:
            # Convert to datetime if it's a string
            if isinstance(fecha_extension, str):
                fecha_extension = timezone.make_aware(datetime.datetime.strptime(fecha_extension, "%Y-%m-%d"))
            formatted_date = fecha_extension.strftime('%d-%m-%Y')
        else:
            formatted_date = None
        return formatted_date
    
    # Estadísticas de uso
    estadisticas_uso = serializers.SerializerMethodField()
    def get_estadisticas_uso(self, obj):
        current_month = datetime.date.today().month

        data_estadisticas = obtener_asistencia_total_proyecto(obj, current_month)
        data = {
            'mesesInforme': [],
            'asistenciaMensual': data_estadisticas['mensual'],
            'estadisticasTotal': data_estadisticas['total']

        }

        asistencias = Asistencia.objects.filter(proyecto=obj, fecha__lte=datetime.date.today())
        asistencias_por_mes = asistencias.annotate(month=TruncMonth('fecha')).values('month').distinct()
        for mes in asistencias_por_mes:
            mes_fecha = mes['month']
            mes_id = mes_fecha.month
            mes_nombre = MESES_NOMBRE[mes_id - 1]
            full_name = f"{mes_nombre} {mes_fecha.year}"

            data['mesesInforme'].append({
                'id': mes_id,
                'full_name': full_name 
            }) 

        return data
    
    # Proyeto pronto a terminar
    pronto_a_terminar = serializers.SerializerMethodField()
    def get_pronto_a_terminar(self, obj):
        return obj.es_fecha_termino_menor_o_igual_a_2_semanas()

    # Extracciones
    extracciones = serializers.SerializerMethodField()
    def get_extracciones(self, obj):
        extracciones_instance = obj.extraccion_set.all().order_by('numero')
        data = []
        for extraccion in extracciones_instance:
            data.append({
                'id': extraccion.id,
                'numero': extraccion.numero,
                'fecha': extraccion.fecha.strftime('%d-%m-%Y'),
                'estado': extraccion.estado,
                'gabinete': extraccion.gabinete,
            })
        return data

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
            'asistencia',
            'extendido',
            'pronto_a_terminar',
            'formatted_fecha_extension',
            'estadisticas_uso',
            'extracciones',
        ]

    
class ProyectoNoActivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = [
            'id',
            'nombre',
            'estado',
        ]



class InformeAsistenciaSerializer(serializers.ModelSerializer):
    data_total = serializers.SerializerMethodField()
    data_mes = serializers.SerializerMethodField()
    formatted_fecha_inicio = serializers.SerializerMethodField()
    formatted_fecha_termino = serializers.SerializerMethodField()
    pronto_a_terminar = serializers.SerializerMethodField()

    def get_data_total(self, obj):
        mes = self.context.get('mes')
        data_estadisticas = obtener_asistencia_total_proyecto(obj, mes)
        data = {
            'asistenciaMensual': data_estadisticas['mensual'],
            'estadisticasTotal': data_estadisticas['total']
        }

        return data

    
    def get_data_mes(self, obj):

        data_asignadas = []

        mes = self.context.get('mes')
        # asistencias = obj.jornada_set.all().values_list('asistencia', flat=True)
        asistencias_mes = Asistencia.objects.filter(
            proyecto=obj,
            fecha__month=mes,
        ).order_by('fecha')

        # Dejar solo las asistencias que no son extras
        asistencias_asignadas = asistencias_mes.filter(tipo__in=['regular', 'recuperacion'])

        for asistencia in asistencias_asignadas:
            # Obtener investigadores asistentes
            investigadores = asistencia.asistenciainvestigador_set.all()

            data_asignadas.append({
                'fecha': asistencia.fecha.strftime('%d-%m-%Y'),
                'ingreso': extraer_hora_de_fecha(asistencia.datetime_ingreso),
                'salida': extraer_hora_de_fecha(asistencia.datetime_salida),
                'asistentes': obtener_investigadores_asistentes(asistencia)
            })

        data_extras = []
        asistencias_extras = asistencias_mes.filter(tipo='extra')
        for asistencia in asistencias_extras:


            data_extras.append({
                'fecha': asistencia.fecha.strftime('%d-%m-%Y'),
                'ingreso': extraer_hora_de_fecha(asistencia.datetime_ingreso),
                'salida': extraer_hora_de_fecha(asistencia.datetime_salida),
                'asistentes': obtener_investigadores_asistentes(asistencia)
            })

        estadisticas_mes_data = cacular_estadisticas_de_asistencia_del_mes(asistencias_asignadas)

        estadisticas_mes = {
            'porcentajeAsistenciaMes': estadisticas_mes_data['porcentajeAsistencia'],
            'usoHorasAsignadasMes': trunc(estadisticas_mes_data['horasUtilizadas'] / estadisticas_mes_data['horasAsignadas'] * 100),
            'horasExtraMes': estadisticas_mes_data['horasExtra']
        }
        

        return {
            'asignadas': data_asignadas,
            'extras': data_extras,
            'estadisticasMes': estadisticas_mes
        }
    
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

    
    def get_pronto_a_terminar(self, obj):
        return obj.es_fecha_termino_menor_o_igual_a_1_mes()
    

    class Meta:
        model = Proyecto
        fields = [
            'id',
            'nombre',
            'estado',
            'formatted_fecha_inicio',
            'formatted_fecha_termino',
            'extendido',
            'pronto_a_terminar',
            'data_mes',
            'data_total',
        ]

