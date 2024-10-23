import datetime
from math import trunc


APELLIDOS_COMPUESTOS = [
    "de", "del", "de la", "de las", "de los", "la", "san", "santa", 'van', 'von', 'di', 'da', 'dos', 
]


def obtener_apellido(persona):
    if not persona.apellido:
        return None

    apellidos = persona.apellido.split()
    apellido_completo = apellidos[0]

    if apellido_completo.lower() in APELLIDOS_COMPUESTOS:
        apellido_completo = ' '.join(apellidos[:2])
        if apellido_completo.lower() in APELLIDOS_COMPUESTOS:
            apellido_completo = ' '.join(apellidos[:3])

    return apellido_completo


def capitalize_first(phrase):
    if phrase:
        words = phrase.split()
        words[0] = words[0].capitalize()
        return ' '.join(words)

    else:
        return None


def extraer_hora_de_fecha(datetime_string):
    return datetime_string.split()[1] if datetime_string else None


def calcular_minutos_entre_horas(hora_inicio, hora_fin):
    datetime_ingreso = datetime.datetime.combine(datetime.datetime.min, hora_inicio)
    datetime_salida = datetime.datetime.combine(datetime.datetime.min, hora_fin)
    time_diference = datetime_salida - datetime_ingreso
    return time_diference.total_seconds() / 60


def minutos_a_hhmm(minutos):
    horas = trunc(minutos // 60)
    minutos_restantes = trunc(minutos % 60)
    return f"{horas:02}:{minutos_restantes:02}"