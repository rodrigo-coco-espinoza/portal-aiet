from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from apps.base.models import Persona
from apps.user.models import UserAccount
from django.conf import settings
from apps.user.serializers import *
from apps.base.serializers import (
    InstitucionSelectSerializer,
    PersonaSelectSerializer,
    PersonaSerializer,
    InstitucionSerializer,
)
from .serializers import (
    ProyectoActivoSerializer,
    ProyectoNoActivoSerializer,
    InformeAsistenciaSerializer,
    MESES_NOMBRE,
)
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
from dateutil.relativedelta import relativedelta


from pprint import pprint

# Create your views here.
DIAS_ENG_A_ESP = {
    "monday": "lunes",
    "tuesday": "martes",
    "wednesday": "miércoles",
    "thursday": "jueves",
    "friday": "viernes",
}


DIAS_A_DIGITO = {
    "lunes": 0,
    "martes": 1,
    "miércoles": 2,
    "jueves": 3,
    "viernes": 4,
}

DIGITO_A_DIA = {
    "0": "lunes",
    "1": "martes",
    "2": "miércoles",
    "3": "jueves",
    "4": "viernes",
}

JORNADAS_HACIENDA = [
    "lunes[AM]",
    "lunes[PM]",
    "martes[AM]",
    "martes[PM]",
    "miércoles[AM]",
    "miércoles[PM]",
    "jueves[AM]",
    "jueves[PM]",
    "viernes[AM]",
    "viernes[PM]",
]


def obtener_dia(fecha):
    return DIAS_ENG_A_ESP[fecha.strftime("%A").lower()]


def obtener_bloques_ocupados():
    proyectos_instance = Proyecto.objects.filter(
        fecha_termino__gte=timezone.now()
    ).exclude(Q(estado="finalizado") | Q(estado="rechazado"))

    bloques_ocupados = {
        "Bora Bora": {"am": [False] * 5, "pm": [False] * 5},
        "Rapa Nui": {"am": [False] * 5, "pm": [False] * 5},
        "Juan Fernández": {"am": [False] * 5, "pm": [False] * 5},
    }

    return bloques_ocupados


def obtener_jornada_minhacienda():
    # Estructura datos de respuesta
    data = {
        "proyectos": [],
        "horario": [
            {"dia": "lunes", "AM": None, "PM": None},
            {"dia": "martes", "AM": None, "PM": None},
            {"dia": "miércoles", "AM": None, "PM": None},
            {"dia": "jueves", "AM": None, "PM": None},
            {"dia": "viernes", "AM": None, "PM": None},
        ],
    }

    # Proyectos de MINHACIENDA
    hacienda_instance = Institucion.objects.get(sigla="MINHACIENDA")
    instituciones_hacienda = Institucion.objects.filter(
        Q(ministerio=hacienda_instance) | Q(sigla="MINHACIENDA")
    ).all()

    proyectos = Proyecto.objects.filter(institucion__in=instituciones_hacienda).exclude(
        Q(protocolo="") | Q(estado="finalizado") | Q(estado="rechazado")
    )

    # Agregar proyectos activos
    for proyecto in proyectos:
        data["proyectos"].append({"id": proyecto.id, "nombre": proyecto.nombre})

    # Obtener asistencias regulares de Juan Fernández desde la fecha actual
    fecha_actual = datetime.now().date()
    asistencias = Asistencia.objects.filter(
        proyecto__in=proyectos,
        fecha__gte=fecha_actual,
        tipo="regular",
        equipo="Juan Fernández",
    )
    # Obtener las jornadas los proyectos que son en Juan Fernández
    # jornadas = Jornada.objects.filter(proyecto__in=proyectos, extra=0, active=1, equipo="Juan Fernández")
    for asistencia in asistencias:
        for item in data["horario"]:
            if item["AM"] != None and item["PM"] != None:
                continue
            if item["dia"] == obtener_dia(asistencia.fecha):
                item[asistencia.horario] = asistencia.proyecto.id
                break

    return data


def get_calendario():

    calendario = []
    feriados = Chile()

    # Fecha inicio y término del calendario
    fecha_actual = datetime.now().date()
    inicio = fecha_actual - timedelta(weeks=4)
    while inicio.weekday() != 0:
        inicio -= timedelta(days=1)

    fin = fecha_actual + timedelta(weeks=4)
    while fin.weekday() != 4:  # 4 representa el viernes
        fin += timedelta(days=1)

    # Obtener todos los proyectos activos y sus asistencias
    asistencias = Asistencia.objects.filter(
        # proyecto__in=proyectos_activos,
        fecha__range=(inicio, fin)
    ).exclude(motivo_salida__in=["asistencia cedida", "inasistencia anticipada"])

    # Generar los días del calendario
    cuenta_dia = inicio
    fecha_to_index = {}
    index_dia = 0
    while cuenta_dia <= fin:
        # Agregar solo días laborales
        dia_int = cuenta_dia.weekday()

        if dia_int < 5:

            calendario.append(
                {
                    "dia": DIGITO_A_DIA[str(dia_int)].capitalize(),
                    "fecha": cuenta_dia.strftime("%d-%m-%Y"),
                    "feriado": cuenta_dia in feriados,
                    "pasado": True if cuenta_dia < fecha_actual else False,
                    "Bora Bora": {
                        "AM": {
                            "institucion": None,
                            "id_proyecto": None,
                            "proyecto": None,
                            "tipo": "",
                            "asistencia": False,
                        },
                        "PM": {
                            "institucion": None,
                            "id_proyecto": None,
                            "proyecto": None,
                            "tipo": "",
                            "asistencia": False,
                        },
                    },
                    "Rapa Nui": {
                        "AM": {
                            "institucion": None,
                            "id_proyecto": None,
                            "proyecto": None,
                            "tipo": "",
                            "asistencia": False,
                        },
                        "PM": {
                            "institucion": None,
                            "id_proyecto": None,
                            "proyecto": None,
                            "tipo": "",
                            "asistencia": False,
                        },
                    },
                    "Juan Fernández": {
                        "AM": {
                            "institucion": None,
                            "id_proyecto": None,
                            "proyecto": None,
                            "tipo": "",
                            "asistencia": False,
                        },
                        "PM": {
                            "institucion": None,
                            "id_proyecto": None,
                            "proyecto": None,
                            "tipo": "",
                            "asistencia": False,
                        },
                    },
                }
            )

            fecha_to_index[cuenta_dia] = index_dia
            index_dia += 1

        cuenta_dia += timedelta(days=1)

    # Rellenar el calendario con las jornada
    for asistencia in asistencias:
        indice = fecha_to_index[asistencia.fecha]
        equipo = asistencia.equipo
        horario = asistencia.horario
        sigla = asistencia.proyecto.institucion.sigla
        nombre = asistencia.proyecto.nombre

        calendario[indice][equipo][horario][
            "institucion"
        ] = f"{sigla} ({asistencia.proyecto.id})"
        calendario[indice][equipo][horario]["proyecto"] = nombre
        calendario[indice][equipo][horario]["tipo"] = asistencia.tipo
        calendario[indice][equipo][horario]["asistencia"] = (
            True if asistencia.datetime_ingreso else False
        )

    return calendario


def obtener_asistencias(persona):
    hoy = date.today()

    proyectos_encargado = (
        Rol.objects.filter(persona=persona, proyecto__estado="en curso")
        .filter(Q(rol="encargado") | Q(rol="investigador"))
        .values_list("proyecto_id", flat=True)
    )

    asistencias_del_dia = Asistencia.objects.filter(
        proyecto_id__in=proyectos_encargado, fecha=hoy
    )

    data = []
    for asistencia in asistencias_del_dia:
        ingreso_hhmm = (
            asistencia.datetime_ingreso.split()[1]
            if asistencia.datetime_ingreso
            else None
        )
        salida_hhmm = (
            asistencia.datetime_salida.split()[1]
            if asistencia.datetime_salida
            else None
        )

        # Investigadores
        investigadores = asistencia.proyecto.rol_set.all()

        data.append(
            {
                "id": asistencia.id,
                "codigo": asistencia.proyecto.id,
                "sigla": asistencia.proyecto.institucion.sigla,
                "nombre": asistencia.proyecto.nombre,
                "extendido": asistencia.proyecto.extendido,
                "pronto_a_terminar": asistencia.proyecto.es_fecha_termino_menor_o_igual_a_2_semanas(),
                "dia": DIGITO_A_DIA[str(asistencia.fecha.weekday())],
                "fecha": asistencia.fecha.strftime("%d-%m-%Y"),
                "equipo": asistencia.equipo,
                "jornada": asistencia.horario,
                "ingreso": ingreso_hhmm,
                "salida": salida_hhmm,
                "tipo": asistencia.tipo,
                "investigadores": PersonaSelectSerializer(
                    investigadores, many=True
                ).data,
            }
        )

    return data


def obtener_proyectos():
    instituciones = Institucion.objects.all()
    data = []

    for institucion in instituciones:
        proyectos = Proyecto.objects.filter(institucion=institucion)

        if proyectos:
            institucion_data = {
                "id_institucion": institucion.id,
                "nombre_institucion": institucion.nombre,
                "nombre_sigla": institucion.sigla,
                "proyectos": [],
            }

            for proyecto in proyectos:
                if proyecto.fecha_inicio:
                    fecha = proyecto.fecha_inicio
                if proyecto.estado in [
                    "solicitud recibida",
                    "confección del protocolo",
                    "en curso",
                ]:
                    institucion_data["proyectos"].append(
                        ProyectoActivoSerializer(proyecto).data
                    )
                else:
                    institucion_data["proyectos"].append(
                        ProyectoNoActivoSerializer(proyecto).data
                    )

            data.append(institucion_data)
    return data


def obtener_proyectos_finalizados(timeframe_weeks=8):
    # Construir el filtro base
    filtros = {"estado": "finalizado", "protocolo__isnull": False}

    # Solo agregar el filtro de fecha si timeframe_weeks no es None
    if timeframe_weeks is not None:
        filtros["fecha_termino__gte"] = timezone.now() - timedelta(
            weeks=timeframe_weeks
        )

    proyectos_finalizados = (
        Proyecto.objects.filter(**filtros)
        .select_related("institucion")
        .order_by("-fecha_termino")
    )

    data = []
    for proyecto in proyectos_finalizados:
        data_proyecto = ProyectoActivoSerializer(proyecto).data
        data_proyecto["institucion"] = InstitucionSerializer(proyecto.institucion).data
        data.append(data_proyecto)

    return data


class AddProyecto(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):

        form_data = request.data

        # Obtener la instancia de la Institución
        institucion_id = form_data.get("institucion")
        institucion_instance = Institucion.objects.get(id=institucion_id)

        # Obtener instancias de encargado y backup
        encargadoSII_id = form_data.get("encargado")
        encargadoSII_instance = Persona.objects.get(id=encargadoSII_id)

        backupSII_id = form_data.get("backup")
        backupSII_instance = Persona.objects.get(id=backupSII_id)

        nuevo_proyecto = Proyecto.objects.create(
            institucion=institucion_instance,
            nombre=form_data.get("nombre").strip(),
            objetivo=form_data.get("objetivo").strip(),
            encargado_sii=encargadoSII_instance,
            backup_sii=backupSII_instance,
            oficio_recibido=form_data.get("documento"),
            fecha_oficio_recibido=form_data.get("fecha"),
            gabinete=form_data.get("gabinete").strip(),
            author=request.user,
            estado="solicitud recibida",  # You can set the initial state here
        )
        nuevo_proyecto.save()

        institucion_data = {
            "id_institucion": institucion_instance.id,
            "nombre_institucion": institucion_instance.nombre,
            "nombre_sigla": institucion_instance.sigla,
            "proyectos": [],
        }

        proyectos = Proyecto.objects.filter(institucion=institucion_instance)
        for proyecto in proyectos:
            if proyecto.estado in [
                "solicitud recibida",
                "confección del documento",
                "en curso",
            ]:
                institucion_data["proyectos"].append(
                    ProyectoActivoSerializer(proyecto).data
                )
            else:
                institucion_data["proyectos"].append(
                    ProyectoNoActivoSerializer(proyecto).data
                )

        # Handle form_data and create a new project
        return Response({"nuevo_proyecto": institucion_data}, status=status.HTTP_200_OK)


class AddInstitucion(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        data = json.loads(request.body)
        try:
            ministerio = (
                Institucion.objects.get(id=data["ministerio"])
                if data["ministerio"]
                else None
            )

            nueva_institucion = Institucion(
                nombre=data["nombre"],
                sigla=data["sigla"],
                rut=data["rut"],
                direccion=data["direccion"],
                tipo=data["tipo"],
                ministerio=ministerio,
            )
            nueva_institucion.save()
            nueva_institucion_data = InstitucionSelectSerializer(
                nueva_institucion, many=False
            ).data

            return Response(
                {
                    "nuevaInstitucion": nueva_institucion_data,
                    "isMinisterio": True if data["tipo"] == "ministerio" else False,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ListInstitucioneSelectView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        instituciones = Institucion.objects.all()
        ministerios = Institucion.objects.filter(tipo="ministerio")
        if instituciones.exists():
            resultInstituciones = [
                InstitucionSelectSerializer(institucion).data
                for institucion in instituciones
            ]

            resultMinisterios = [
                InstitucionSelectSerializer(ministerio).data
                for ministerio in ministerios
            ]

            resultMinisterios.insert(0, {"id": None, "full_name": "No aplica"})

            return Response(
                {
                    "institucionesOptions": resultInstituciones,
                    "ministeriosOptions": resultMinisterios,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "No se han encontrado instituciones."},
                status=status.HTTP_404_NOT_FOUND,
            )


class ListProyectosView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):

        data = obtener_proyectos()

        return Response({"proyectosInstituciones": data}, status=status.HTTP_200_OK)


class DownloadOficioRecibido(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, proyecto_id):
        proyecto = get_object_or_404(Proyecto, id=proyecto_id)

        try:
            response = FileResponse(proyecto.oficio_recibido.open("rb"))
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)


class ActualizarEncargadosSii(APIView):
    permission_classes = (PcIslaPermissions,)

    def patch(self, request, format=None):
        data = request.data
        try:
            proyecto = Proyecto.objects.get(id=data["proyectoId"])
            nuevo_encargado = Persona.objects.get(id=data["encargadoSii"])
            nuevo_backup = Persona.objects.get(id=data["backupSii"])

            proyecto.encargado_sii = nuevo_encargado
            proyecto.backup_sii = nuevo_backup
            proyecto.save()

            result = ProyectoActivoSerializer(proyecto).data

            return Response(
                {"institucion": proyecto.institucion.id, "proyectoActualizado": result},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RechazarProyecto(APIView):
    permission_classes = (PcIslaPermissions,)

    def patch(self, request, format=None):
        data = request.data

        try:
            proyecto = Proyecto.objects.get(id=data["idProyecto"])
            proyecto.estado = "rechazado"
            proyecto.save()

            result = ProyectoNoActivoSerializer(proyecto).data
            return Response(
                {"institucion": proyecto.institucion.id, "proyectoRechazado": result},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)


class AceptarProyecto(APIView):
    permission_classes = (PcIslaPermissions,)
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, format=None):
        data = request.data

        try:
            proyecto = Proyecto.objects.get(id=data["id"])
            proyecto.oficio_respuesta = data["documento"]
            proyecto.fecha_oficio_respuesta = data["fecha"]
            proyecto.estado = "confección del protocolo"
            proyecto.save()

            result = ProyectoActivoSerializer(proyecto).data
            return Response(
                {"institucion": proyecto.institucion.id, "proyectoAceptado": result},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print(str(e))
            return Response({"error": str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)


class DownloadOficioRespuesta(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, proyecto_id):
        proyecto = get_object_or_404(Proyecto, id=proyecto_id)

        try:
            response = FileResponse(proyecto.oficio_respuesta.open("rb"))
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)


class ListsPersonasInstitucion(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, institucion_id):
        try:
            personas = Persona.objects.filter(institucion_id=institucion_id)
            result = PersonaSerializer(personas, many=True)
            return Response(
                {"personasInstitucion": result.data}, status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, institucion_id):
        try:
            data = request.data
            institucion_instance = Institucion.objects.get(id=institucion_id)
            persona = Persona(
                nombre=data["nombre"].strip(),
                apellido=data["apellido"].strip(),
                rut=data["rut"],
                email=data["email"],
                telefono=data["telefono"] if data["telefono"] != "" else None,
                area=data["area"] if data["area"] != "" else None,
                cargo=data["cargo"] if data["cargo"] != "" else None,
                institucion=institucion_instance,
            )
            persona.save()

            result = PersonaSerializer(persona).data

            return Response({"nuevaPersona": result}, status=status.HTTP_200_OK)
        except Exception as e:
            print(str(e))
            return Response({"error": str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)


class BloquesOcupados(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):

        bloques_ocupados = obtener_bloques_ocupados()

        return Response(
            {"bloquesOcupados": bloques_ocupados}, status=status.HTTP_200_OK
        )


class AddProtocolo(APIView):
    permission_classes = (PcIslaPermissions,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):

        try:
            data = request.data

            # # Agregar info al proyecto
            proyecto = Proyecto.objects.get(id=data["proyectoId"])
            proyecto.protocolo = data["documento"]
            proyecto.fecha_inicio = data["fecha_inicio"]
            proyecto.fecha_termino = data["fecha_termino"]
            proyecto.estado = "en curso"
            proyecto.save()

            # Agregar encargado e investigadores
            encargado_instance = Persona.objects.get(id=data["encargado"])
            nuevo_encargado = Rol.objects.create(
                proyecto=proyecto, persona=encargado_instance, rol="encargado"
            )
            nuevo_encargado.save()

            investigadores = data.getlist("investigadores[]")

            for investigador_id in investigadores:
                investigador_instance = Persona.objects.get(id=investigador_id)
                nuevo_investigador = Rol.objects.create(
                    proyecto=proyecto, persona=investigador_instance, rol="investigador"
                )
                nuevo_investigador.save()

            # Agregar asistencias
            jornada_am = list(map(int, data.getlist("jornada_am[]")))
            jornada_pm = list(map(int, data.getlist("jornada_pm[]")))

            feriados = Chile()
            proyecto = Proyecto.objects.get(id=data["proyectoId"])
            start_date = proyecto.fecha_inicio
            end_date = proyecto.fecha_termino
            while start_date <= end_date:
                fecha_date = start_date
                if start_date.weekday() in jornada_am and start_date not in feriados:
                    # Comprobar que no existe una asistencia para ese día, equipo y horario
                    if (
                        not Asistencia.objects.filter(
                            fecha=start_date, equipo=data["equipo"], horario="AM"
                        )
                        .exclude(
                            motivo_salida__in=[
                                "inasistencia anticipada",
                                "asistencia cedida",
                            ]
                        )
                        .exists()
                    ):
                        nueva_asistencia = Asistencia.objects.create(
                            proyecto=proyecto,
                            fecha=start_date,
                            equipo=data["equipo"],
                            horario="AM",
                            tipo="regular",
                        )
                        nueva_asistencia.save()

                if start_date.weekday() in jornada_pm and start_date not in feriados:
                    # Comprobar que no existe una asistencia para ese día, equipo y horario
                    if (
                        not Asistencia.objects.filter(
                            fecha=start_date, equipo=data["equipo"], horario="PM"
                        )
                        .exclude(
                            motivo_salida__in=[
                                "inasistencia anticipada",
                                "asistencia cedida",
                            ]
                        )
                        .exists()
                    ):
                        nueva_asistencia = Asistencia.objects.create(
                            proyecto=proyecto,
                            fecha=start_date,
                            equipo=data["equipo"],
                            horario="PM",
                            tipo="regular",
                        )
                        nueva_asistencia.save()

                start_date += timedelta(days=1)

            # Resultado
            proyecto_result = ProyectoActivoSerializer(proyecto).data
            bloques_ocupados = obtener_bloques_ocupados()
            jornada_minhacienda = obtener_jornada_minhacienda()
            # Actualizar calendario
            calendario = get_calendario()

            return Response(
                {
                    "proyecto_actualizado": proyecto_result,
                    "bloquesOcupados": bloques_ocupados,
                    "id_institucion": proyecto.institucion.id,
                    "jornada_minhacienda": jornada_minhacienda,
                    "calendario": calendario,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)


class DownloadProtocolo(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, proyecto_id):
        proyecto = get_object_or_404(Proyecto, id=proyecto_id)

        try:
            response = FileResponse(proyecto.protocolo.open("rb"))
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)


class JornadaMinhacienda(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]  # Apply different permissions for GET
        else:
            return [
                PcIslaPermissions()
            ]  # Apply different permissions for other methods

    def get(self, request):

        data = obtener_jornada_minhacienda()
        return Response({"jornadas_minhacienda": data}, status=status.HTTP_200_OK)

    def patch(self, request):
        try:
            data = request.data

            # Obtener las asistencias programadas

            hacienda_instance = Institucion.objects.get(sigla="MINHACIENDA")
            instituciones_hacienda = Institucion.objects.filter(
                Q(ministerio=hacienda_instance) | Q(sigla="MINHACIENDA")
            ).all()
            proyectos_activos = Proyecto.objects.filter(
                institucion__in=instituciones_hacienda, estado="en curso"
            )

            asistencias_programadas = Asistencia.objects.filter(
                proyecto__in=proyectos_activos,
                tipo="regular",
                datetime_ingreso__isnull=True,
                datetime_salida__isnull=True,
                fecha__gte=datetime.now().date(),
            )

            # Eliminar asistencias programadas
            asistencias_programadas.delete()

            # Agregar nuevas asistencias

            # Ingresar nueva jornadas
            feriados = Chile()
            data = self.request.data
            for jornada in JORNADAS_HACIENDA:
                try:
                    # Agregar nueva jornada
                    proyecto = Proyecto.objects.get(id=data[jornada])

                    dia_horario = jornada.split("[")
                    dia = dia_horario[0]
                    horario = dia_horario[1].rstrip("]")

                    current_date = datetime.now().date()
                    while current_date <= proyecto.fecha_termino:
                        # Verificar que no exista asistencia en esa fecha, horario y equipo
                        if not Asistencia.objects.filter(
                            fecha=current_date, horario=horario, equipo="Juan Fernández"
                        ).exists():

                            if (
                                current_date.weekday() == DIAS_A_DIGITO[dia]
                                and current_date not in feriados
                            ):
                                nueva_asistencia = Asistencia.objects.create(
                                    proyecto=proyecto,
                                    equipo="Juan Fernández",
                                    horario=horario,
                                    fecha=current_date,
                                    tipo="regular",
                                )
                                nueva_asistencia.save()

                        current_date += timedelta(days=1)

                except Exception as e:
                    print(f"Error: {e}")

            # Actualizar todos los proyectos
            proyectos_todos = obtener_proyectos()
            # Actualizar bloques ocupados
            calendario = get_calendario()
            # Actualizar jornadas Hacienda
            jornadas_minhacienda = obtener_jornada_minhacienda()

            return Response(
                {
                    "proyectos_todos": proyectos_todos,
                    "calendario": calendario,
                    "jornadas_minhacienda": jornadas_minhacienda,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)


class HorarioPcIsla(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        calendario = get_calendario()
        if type(calendario) == TypeError:
            return Response(
                {"error": str(calendario)}, status=status.HTTP_501_NOT_IMPLEMENTED
            )
        else:
            return Response({"calendario": calendario}, status=status.HTTP_200_OK)


class AsistenciaList(APIView):
    permission_classes = (InvestigadorPermissions,)

    def get(self, request):
        data = obtener_asistencias(request.user.persona)
        return Response({"asistencia": data}, status=status.HTTP_200_OK)


class RegistrarIngreso(APIView):
    permission_classes = (InvestigadorPermissions,)

    def post(self, request, format=None):
        data = request.data
        id_asistencia = data["id_asistencia"]

        # Registrar ingreso assistencia
        asistencia = Asistencia.objects.get(id=id_asistencia)
        now = datetime.now()
        formatted_datetime = now.strftime("%d/%m/%Y %H:%M")
        asistencia.datetime_ingreso = formatted_datetime
        asistencia.save()

        # Registrar investigadores asistentes
        id_investigadores = data["investigadores"].split(",")
        for investigador in id_investigadores:
            investigador_instance = Persona.objects.get(id=investigador)
            investigador_asistente = AsistenciaInvestigador(
                asistencia=asistencia, investigador=investigador_instance
            )

            investigador_asistente.save()

        respuesta = obtener_asistencias(request.user.persona)
        return Response({"asistencias": respuesta}, status=status.HTTP_200_OK)


class RegistrarSalida(APIView):
    permission_classes = (InvestigadorPermissions,)

    def patch(self, request, format=None):
        data = request.data
        asistencia = Asistencia.objects.get(id=data["id_asistencia"])
        now = datetime.now()
        formatted_datetime = now.strftime("%d/%m/%Y %H:%M")
        asistencia.datetime_salida = formatted_datetime
        asistencia.motivo_salida = data["motivo"]
        asistencia.save()

        respuesta = obtener_asistencias(request.user.persona)
        return Response({"asistencias": respuesta}, status=status.HTTP_200_OK)


class AddJornadaExtra(APIView):

    permission_classes = (PcIslaPermissions,)

    def post(self, request, format=None):
        data = request.data
        proyecto_instance = Proyecto.objects.get(id=data["id"])

        jornada_am = data.getlist("jornada_am[]")
        # jornada_pm = data.getlist('jornada_pm[]')

        # if jornada_am:
        #     nueva_jornada = Jornada.objects.create(
        #         proyecto=proyecto_instance,
        #         equipo=data['equipo'],
        #         horario='AM',
        #         extra=True,
        #         fecha=data['fecha'],
        #         dia=DIGITO_A_DIA[jornada_am[0]]
        #     )
        #     nueva_jornada.save()
        # else:
        #     nueva_jornada = Jornada.objects.create(
        #         proyecto=proyecto_instance,
        #         equipo=data['equipo'],
        #         horario='PM',
        #         extra=True,
        #         fecha=data['fecha'],
        #         dia=DIGITO_A_DIA[jornada_pm[0]]
        #     )
        #     nueva_jornada.save()

        # Comprobar que no exista la asistencia
        if not Asistencia.objects.filter(
            fecha=data["fecha"],
            horario="AM" if jornada_am else "PM",
            equipo=data["equipo"],
        ).exists():
            nueva_asistencia = Asistencia.objects.create(
                proyecto=proyecto_instance,
                equipo=data["equipo"],
                horario="AM" if jornada_am else "PM",
                fecha=data["fecha"],
                tipo="extra",
            )
            nueva_asistencia.save()

        # nueva_asistencia = Asistencia.objects.create(
        #     proyecto=proyecto_instance,
        #     equipo=data['equipo'],
        #     horario='AM' if jornada_am else 'PM',
        #     fecha=data['fecha'],
        #     tipo='extra'
        # )
        # nueva_asistencia.save()

        # Actualizar proyecto
        proyecto = ProyectoActivoSerializer(proyecto_instance).data
        institucion = proyecto_instance.institucion.id

        # Actualizar bloques ocupados
        bloques_ocupados = obtener_bloques_ocupados()

        # Actualizar calendario
        calendario = get_calendario()

        # Actualizar jornadas hacienda
        if proyecto_instance.institucion.sigla == "MINHACIENDA":
            jornada_minhacienda = obtener_jornada_minhacienda()
        else:
            jornada_minhacienda = None

        return Response(
            {
                "proyecto": proyecto,
                "bloques_ocupados": bloques_ocupados,
                "id_institucion": institucion,
                "jornada_minhacienda": jornada_minhacienda,
                "calendario": calendario,
            },
            status=status.HTTP_200_OK,
        )


class FinalizarProyecto(APIView):
    permission_classes = (PcIslaPermissions,)

    def post(self, request, format=None):
        data = request.data
        proyecto_instance = Proyecto.objects.get(id=data["idProyecto"])

        # Cambiar estado
        proyecto_instance.estado = "finalizado"
        proyecto_instance.save()

        # Actualizar jornada
        # jornadas_instance = Jornada.objects.filter(proyecto=proyecto_instance)
        # jornadas_instance.update(active=False)

        # Eliminar asistencias
        Asistencia.objects.filter(
            proyecto=proyecto_instance,
            fecha__gte=date.today(),
            datetime_ingreso__isnull=True,
            datetime_salida__isnull=True,
        ).delete()

        # Actualizar proyectos
        proyecto_finalizado = ProyectoNoActivoSerializer(proyecto_instance).data
        # Actualizar jornadas minhacienda
        jornadas_minhacienda = obtener_jornada_minhacienda()
        # Actualizar bloques ocupados
        bloques_ocupados = obtener_bloques_ocupados()
        # Actualizar calendario
        calendario = get_calendario()

        return Response(
            {
                "id_institucion": proyecto_instance.institucion.id,
                "proyecto_finalizado": proyecto_finalizado,
                "jornadas_minhacienda": jornadas_minhacienda,
                "bloques_ocupados": bloques_ocupados,
                "calendario": calendario,
            },
            status=status.HTTP_200_OK,
        )


class ExtenderProyecto(APIView):
    permission_classes = (PcIslaPermissions,)

    def post(self, request, format=None):

        data = request.data
        # Encontrar proyecto
        proyecto_instance = Proyecto.objects.get(id=data["proyectoId"])

        # Actualizar parámetros proyecto
        proyecto_instance.extendido = True
        proyecto_instance.fecha_extension = data["fechaDocumento"]
        proyecto_instance.documento_extension = data["documento"]

        fecha_termino_original = proyecto_instance.fecha_termino
        nueva_fecha_termino = fecha_termino_original + relativedelta(months=3)
        proyecto_instance.fecha_termino = nueva_fecha_termino
        proyecto_instance.save()

        # Agregar nuevas asistencia
        fecha_inicio = fecha_termino_original + timedelta(days=1)
        feriados = Chile()
        asistencias_regulares = Asistencia.objects.filter(
            proyecto=proyecto_instance, tipo="regular"
        )

        jornadas_a_extender = {"equipo": None, "AM": [], "PM": []}

        for asistencia in asistencias_regulares:
            if jornadas_a_extender["equipo"] is None:
                jornadas_a_extender["equipo"] = asistencia.equipo

            # fecha = datetime.strptime(asistencia.fecha,"%Y-%m-%d").date()
            if (
                asistencia.horario == "AM"
                and asistencia.fecha.weekday() not in jornadas_a_extender["AM"]
            ):
                jornadas_a_extender["AM"].append(asistencia.fecha.weekday())
            elif (
                asistencia.horario == "PM"
                and asistencia.fecha.weekday() not in jornadas_a_extender["PM"]
            ):
                jornadas_a_extender["PM"].append(asistencia.fecha.weekday())

        while fecha_inicio <= nueva_fecha_termino:
            if (
                fecha_inicio.weekday() in jornadas_a_extender["AM"]
                and fecha_inicio not in feriados
            ):
                nueva_asistencia = Asistencia.objects.create(
                    proyecto=proyecto_instance,
                    equipo=jornadas_a_extender["equipo"],
                    horario="AM",
                    fecha=fecha_inicio,
                    tipo="regular",
                )
                nueva_asistencia.save()

            if (
                fecha_inicio.weekday() in jornadas_a_extender["PM"]
                and fecha_inicio not in feriados
            ):
                nueva_asistencia = Asistencia.objects.create(
                    proyecto=proyecto_instance,
                    equipo=jornadas_a_extender["equipo"],
                    horario="PM",
                    fecha=fecha_inicio,
                    tipo="regular",
                )
                nueva_asistencia.save()

            fecha_inicio += timedelta(days=1)

        # jornadas = Jornada.objects.filter(proyecto=proyecto_instance, active=1, extra=0)
        # for jornada in jornadas:
        #     current_date = fecha_inicio

        #     while current_date <= nueva_fecha_termino:
        #         if current_date.weekday() == DIAS_A_DIGITO[jornada.dia] and current_date not in feriados:
        #             nueva_asistencia = Asistencia.objects.create(
        #                 jornada=jornada,
        #                 fecha=current_date
        #             )
        #             nueva_asistencia.save()
        #         current_date += timedelta(days=1)

        # Actualizar proyectos
        proyecto_actualizado = ProyectoActivoSerializer(proyecto_instance).data
        # Actualizar jornadas minhacienda
        jornadas_minhacienda = obtener_jornada_minhacienda()
        # Actualizar bloques ocupados
        bloques_ocupados = obtener_bloques_ocupados()
        # Actualizar calendario
        calendario = get_calendario()

        return Response(
            {
                "id_institucion": proyecto_instance.institucion.id,
                "proyecto_actualizado": proyecto_actualizado,
                "jornadas_minhacienda": jornadas_minhacienda,
                "bloques_ocupados": bloques_ocupados,
                "calendario": calendario,
            },
            status=status.HTTP_200_OK,
        )


class DownloadExtension(APIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request, proyecto_id):
        proyecto = get_object_or_404(Proyecto, id=proyecto_id)

        try:
            response = FileResponse(proyecto.documento_extension.open("rb"))
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)


class InformeAsistencia(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, proyecto_id, mes):

        proyecto_instance = Proyecto.objects.get(id=proyecto_id)
        data_informe = InformeAsistenciaSerializer(
            proyecto_instance, context={"mes": mes}
        ).data

        return Response(
            {
                "proyecto_id": proyecto_id,
                "mes": MESES_NOMBRE[mes - 1],
                "sigla": proyecto_instance.institucion.sigla,
                "data_informe": data_informe,
            },
            status=status.HTTP_200_OK,
        )


class ListProyectosFinalizados(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            data = obtener_proyectos_finalizados()

            return Response({"proyectos_finalizados": data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UpdateProtocolo(APIView):
    permission_classes = (PcIslaPermissions,)
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, format=None):
        try:
            data = request.data

            # Obtener el proyecto
            proyecto = Proyecto.objects.get(id=data["proyectoId"])

            # Si ya existe un protocolo, eliminarlo del sistema de archivos
            if proyecto.protocolo:
                # Verificar si el archivo existe antes de intentar eliminarlo
                if os.path.exists(proyecto.protocolo.path):
                    os.remove(proyecto.protocolo.path)

            # Asignar el nuevo protocolo
            proyecto.protocolo = data["protocolo"]
            proyecto.save()

            # Resultado
            proyecto_result = ProyectoActivoSerializer(proyecto).data

            return Response(
                {
                    "proyecto_actualizado": proyecto_result,
                    "id_institucion": proyecto.institucion.id,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)


class UpdateExtension(APIView):
    permission_classes = (PcIslaPermissions,)
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, format=None):
        try:
            data = request.data

            # Obtener el proyecto
            proyecto = Proyecto.objects.get(id=data["proyectoId"])

            # Si ya existe un documento de extensión, eliminarlo del sistema de archivos
            if proyecto.documento_extension:
                # Verificar si el archivo existe antes de intentar eliminarlo
                if os.path.exists(proyecto.documento_extension.path):
                    os.remove(proyecto.documento_extension.path)

            # Asignar el nuevo documento de extensión
            proyecto.documento_extension = data["documento"]
            proyecto.save()
            # Resultado
            proyecto_result = ProyectoActivoSerializer(proyecto).data

            return Response(
                {
                    "proyecto_actualizado": proyecto_result,
                    "id_institucion": proyecto.institucion.id,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)


class ListAllProyectosFinalizados(APIView):
    permission_classes = (PcIslaPermissions,)

    def get(self, request, format=None):
        try:
            data = obtener_proyectos_finalizados(timeframe_weeks=None)

            return Response({"proyectos_finalizados": data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class AddExtraccion(APIView):
    permission_classes = (PcIslaPermissions,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):

        try:
            data = request.data

            # Obtener el proyecto
            proyecto = Proyecto.objects.get(id=data["id"])
            
            # Crear nueva extracción
            nueva_extraccion = Extraccion.objects.create(
                proyecto=proyecto,
                numero=int(data["numero_extraccion"]),
                fecha=data["fecha"],
                gabinete=data["gabinete_electronico"],  # Ahora es CharField, no necesita conversión
                informe_revision=data["informe_revision"],
                documento_zip=data["documento_extraccion"],
                estado="Entregado"
            )
            nueva_extraccion.save()

            # Resultado
            proyecto_result = ProyectoActivoSerializer(proyecto).data

            return Response(
                {
                    "proyecto_actualizado": proyecto_result,
                    "id_institucion": proyecto.institucion.id,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)
        
class DownloadInformeRevision(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, extraccion_id):
        extraccion = get_object_or_404(Extraccion, id=extraccion_id)

        try:
            response = FileResponse(extraccion.informe_revision.open("rb"))
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        
class DownloadExtraccion(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, extraccion_id):
        extraccion = get_object_or_404(Extraccion, id=extraccion_id)

        try:
            response = FileResponse(extraccion.documento_zip.open("rb"))
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        

class DeleteExtraccion(APIView):
    permission_classes = (PcIslaPermissions,)

    def delete(self, request, extraccion_id, format=None):
        try:
            extraccion = Extraccion.objects.get(id=extraccion_id)
            proyecto = extraccion.proyecto

            # Eliminar archivos asociados
            if extraccion.informe_revision and os.path.exists(extraccion.informe_revision.path):
                os.remove(extraccion.informe_revision.path)
            if extraccion.documento_zip and os.path.exists(extraccion.documento_zip.path):
                os.remove(extraccion.documento_zip.path)

            # Eliminar la extracción
            extraccion.delete()

            # Resultado
            proyecto_result = ProyectoActivoSerializer(proyecto).data

            return Response(
                {
                    "proyecto_actualizado": proyecto_result,
                    "id_institucion": proyecto.institucion.id,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)