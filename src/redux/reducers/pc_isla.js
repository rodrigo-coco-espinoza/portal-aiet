import {
    ADD_PROYECTO_SUCCESS,
    ADD_PROYECTO_FAIL,
    GET_INSTITUCIONES_OPTIONS_SUCCESS,
    GET_INSTITUCIONES_OPTIONS_FAIL,
    ADD_INSTITUCION_SUCCESS,
    ADD_INSTITUCION_FAIL,
    GET_ENCARGADOS_PC_ISLA_SUCCESS,
    GET_ENCARGADOS_PC_ISLA_FAIL,
    GET_PROYECTOS_SUCCESS,
    GET_PROYECTOS_FAIL,
    UPDATE_ENCARGADOS_SII_FAIL,
    UPDATE_ENCARGADOS_SII_SUCCESS,
    RECHAZAR_PROYECTO_FAIL,
    RECHAZAR_PROYECTO_SUCCESS,
    ACEPTAR_PROYECTO_FAIL,
    ACEPTAR_PROYECTO_SUCCESS,
    GET_PERSONAS_INSTITUCION_FAIL,
    GET_PERSONAS_INSTITUCION_SUCCESS,
    ADD_PERSONA_INSTITUCION_FAIL,
    ADD_PERSONA_INSTITUCION_SUCCESS,
    GET_BLOQUES_OCUPADOS_FAIL,
    GET_BLOQUES_OCUPADOS_SUCCESS,
    ADD_PROTOCOLO_FAIL,
    ADD_PROTOCOLO_SUCCESS,
    GET_JORNADAS_MINHACIENDA_SUCCESS,
    GET_CALENDARIO_PC_ISLA_SUCCESS,
    UPDATE_JORNADAS_MINHACIENDA_SUCCESS,
    GET_ASISTENCIA_SUCCESS,
    REGISTRAR_INGRESO_SUCCESS,
    REGISTRAR_SALIDA_SUCCESS,
    ADD_JORNADA_EXTRA_SUCCES,
    FINALIZAR_PROYECTO_SUCCESS,
    EXTENDER_PROYECTO_SUCCESS,
    GET_PROYECTOS_FINALIZADOS_SUCCESS,
    GET_PROYECTOS_FINALIZADOS_FAIL,
    UPDATE_PROTOCOLO_SUCCESS,
    UPDATE_PROTOCOLO_FAIL,
    UPDATE_EXTENSION_SUCCESS,
    UPDATE_EXTENSION_FAIL,
    GET_ALL_PROYECTOS_FINALIZADOS_SUCCESS,
    GET_ALL_PROYECTOS_FINALIZADOS_FAIL,
    ADD_EXTRACCION_SUCCESS,
    ADD_EXTRACCION_FAIL,
    DELETE_EXTRACCION_SUCCESS,
    DELETE_EXTRACCION_FAIL
} from '../actions/pc_isla/types'

const initialState = {
    institucionesOptions: [],
    ministeriosOptions: [],
    encargadosPcIslaOptions: [],
    proyectosPcIsla: [],
    personasInstitucion: [],
    bloquesOcupados: {},
    jornadasHacienda: {},
    calendario: [],
    asistencias: [],
    proyectosPcIslaFinalizados: [],
};

const reemplazarProyecto = (proyectosState, idInstitucion, proyectoNuevo) => {
    // Encontrar institución
    const result = proyectosState;
    const institucionIndex = proyectosState.findIndex((inst) => inst.id_institucion === idInstitucion);
    // Encontrar proyecto
    const proyectoIndex = proyectosState[institucionIndex].proyectos.findIndex((proyecto) => proyecto.id === proyectoNuevo.id);
    result[institucionIndex].proyectos[proyectoIndex] = proyectoNuevo;
    return result;
};

let proyectosActualizados;


export function institucion_reducer (state=initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_INSTITUCIONES_OPTIONS_SUCCESS:
            return {
                ...state,
                institucionesOptions: payload.institucionesOptions,
                ministeriosOptions: payload.ministeriosOptions,
            }
        case GET_INSTITUCIONES_OPTIONS_FAIL:
            return {
                ...state,
                institucionesOptions: [],
                ministeriosOptions: [],
            }
        
        case ADD_INSTITUCION_SUCCESS:
            const newInstitucionesOptions = [...state.institucionesOptions, payload.nuevaInstitucion];
            // Sort the array alphabetically based on the 'full_name' property
            const sortedInstitucionOptions = newInstitucionesOptions.sort((a, b) => a.full_name.localeCompare(b.full_name));

            if (payload.isMinisterio){
                const newMinisteriosOptions = [...state.ministeriosOptions, payload.nuevaInstitucion]
                const sortedMinisteriosOptions = newMinisteriosOptions.sort((a, b) => a.full_name.localeCompare(b.full_name));
                return {
                    ...state,
                    institucionesOptions: sortedInstitucionOptions,
                    ministeriosOptions: sortedMinisteriosOptions
                }
            } else {
                return {
                    ...state,
                    institucionesOptions: sortedInstitucionOptions
                }
            }

        case GET_ENCARGADOS_PC_ISLA_SUCCESS:
            return {
                ...state,
                encargadosPcIslaOptions: payload.encargadosPcIslaOptions
            }
        case GET_PROYECTOS_SUCCESS:
            return {
                ...state,
                proyectosPcIsla: payload.proyectosInstituciones
            }
        case ADD_PROYECTO_SUCCESS:
            const updatedProyectosPcIsla = [...state.proyectosPcIsla];
            // Encontrar institucion en el estado
            const existingInstitucionIndex = updatedProyectosPcIsla.findIndex((inst) => inst.id_institucion === payload.nuevo_proyecto.id_institucion);

            if (existingInstitucionIndex !== -1){
                // Si la institución existe, reemplazar
                updatedProyectosPcIsla[existingInstitucionIndex] = payload.nuevo_proyecto;
            } else {
                updatedProyectosPcIsla.push(payload.nuevo_proyecto);
            }

            return {
                ...state,
                proyectosPcIsla: updatedProyectosPcIsla
            }
        case UPDATE_ENCARGADOS_SII_SUCCESS:

            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.institucion, payload.proyectoActualizado);

            return {
                ...state,
                proyectosPcIsla: proyectosActualizados,
            };
        case RECHAZAR_PROYECTO_SUCCESS:
            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.institucion, payload.proyectoRechazado);

            return {
                ...state,
                proyectosPcIsla: proyectosActualizados
            };
        case ACEPTAR_PROYECTO_SUCCESS:
            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.institucion, payload.proyectoAceptado);

            return {
                ...state,
                proyectosPcIsla: proyectosActualizados
            }; 
        case GET_PERSONAS_INSTITUCION_SUCCESS:
            return {
                ...state,
                personasInstitucion: payload.personasInstitucion
            };
        case ADD_PERSONA_INSTITUCION_SUCCESS:
            const newPersona = action.payload.nuevaPersona;
            
            // Push the new persona into personasInstitucion array
            const updatedPersonasInstitucion = [...state.personasInstitucion, newPersona];
            
            // Sort personasInstitucion array by nombre using localeCompare
            updatedPersonasInstitucion.sort((a, b) => a.nombre.localeCompare(b.nombre));
            
            return {
                ...state,
                personasInstitucion: updatedPersonasInstitucion,
            };
        case GET_BLOQUES_OCUPADOS_SUCCESS:
            return {
                ...state,
                bloquesOcupados: payload.bloquesOcupados
            };
        case ADD_PROTOCOLO_SUCCESS:

            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.id_institucion, payload.proyecto_actualizado);

            return {
                ...state,
                proyectosPcIsla: proyectosActualizados,
                bloquesOcupados: payload.bloquesOcupados,
                jornadasHacienda: payload.jornada_minhacienda,
                calendario: payload.calendario
            };
        case GET_JORNADAS_MINHACIENDA_SUCCESS:
            return {
                ...state,
                jornadasHacienda: payload.jornadas_minhacienda
            };
        case GET_CALENDARIO_PC_ISLA_SUCCESS:
            return {
                ...state,
                calendario: payload.calendario
            };
        case UPDATE_JORNADAS_MINHACIENDA_SUCCESS:
               return {
                ...state,
                proyectosPcIsla: payload.proyectos_todos,
                calendario: payload.calendario,
                jornadasHacienda: payload.jornadas_minhacienda
            };
        case GET_ASISTENCIA_SUCCESS:
            return {
                ...state,
                asistencias: payload.asistencia
            };
        case REGISTRAR_INGRESO_SUCCESS:
            return {
                ...state,
                asistencias: payload.asistencias
            };
        case REGISTRAR_SALIDA_SUCCESS:
            return {
                ...state,
                asistencias: payload.asistencias
            };
        case ADD_JORNADA_EXTRA_SUCCES:

            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.id_institucion, payload.proyecto);

            // Actualizar jornada de Hacienda si corresponde
            let jornada_update_JornadaExtra = state.jornadasHacienda;
            if (payload.jornada_minhacienda){
                jornada_update_JornadaExtra = payload.jornada_minhacienda;
            }

            return {
                ...state,
                proyectosPcIsla: proyectosActualizados,
                bloquesOcupados: payload.bloques_ocupados,
                jornadasHacienda: jornada_update_JornadaExtra,
                calendario: payload.calendario
            };
        case FINALIZAR_PROYECTO_SUCCESS:
            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.id_institucion, payload.proyecto_finalizado);
            return {
                ...state,
                proyectosPcIsla: proyectosActualizados,
                bloquesOcupados: payload.bloques_ocupados,
                jornadasHacienda: payload.jornadas_minhacienda,
                calendario: payload.calendario,
            };
        case EXTENDER_PROYECTO_SUCCESS:
            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.id_institucion, payload.proyecto_actualizado);

            return {
                ...state,
                proyectosPcIsla: proyectosActualizados,
                bloquesOcupados: payload.bloques_ocupados,
                jornadasHacienda: payload.jornadas_minhacienda,
                calendario: payload.calendario,
            };
        case GET_PROYECTOS_FINALIZADOS_SUCCESS:
            return {
                ...state,
                proyectosPcIslaFinalizados: payload.proyectos_finalizados
            };
        case UPDATE_PROTOCOLO_SUCCESS:
            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.id_institucion, payload.proyecto_actualizado);
            return {
                ...state,
                proyectosPcIsla: proyectosActualizados,
            };
        case UPDATE_EXTENSION_SUCCESS:
            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.id_institucion, payload.proyecto_actualizado);
            return {
                ...state,
                proyectosPcIsla: proyectosActualizados,
            };
        case GET_ALL_PROYECTOS_FINALIZADOS_SUCCESS:
            return {
                ...state,
                proyectosPcIslaFinalizados: payload.proyectos_finalizados
            };
        case ADD_EXTRACCION_SUCCESS:
            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.id_institucion, payload.proyecto_actualizado);
            return {
                ...state,
                proyectosPcIsla: proyectosActualizados,
            };
        case DELETE_EXTRACCION_SUCCESS:
            proyectosActualizados = reemplazarProyecto([...state.proyectosPcIsla], payload.id_institucion, payload.proyecto_actualizado);
            return {
                ...state,
                proyectosPcIsla: proyectosActualizados,
            };
        // Fallos
        case UPDATE_ENCARGADOS_SII_FAIL:
        case ADD_PROTOCOLO_FAIL:
        case GET_BLOQUES_OCUPADOS_FAIL:
        case ADD_PERSONA_INSTITUCION_FAIL:
        case GET_PERSONAS_INSTITUCION_FAIL:
        case ACEPTAR_PROYECTO_FAIL:
        case RECHAZAR_PROYECTO_FAIL:
        case GET_ENCARGADOS_PC_ISLA_FAIL:
        case GET_PROYECTOS_FAIL:       
        case ADD_INSTITUCION_FAIL:
        case ADD_PROYECTO_FAIL:
        case GET_PROYECTOS_FINALIZADOS_FAIL:
        case UPDATE_PROTOCOLO_FAIL:
        case UPDATE_EXTENSION_FAIL:
        case GET_ALL_PROYECTOS_FINALIZADOS_FAIL:
        case DELETE_EXTRACCION_FAIL:
        case ADD_EXTRACCION_FAIL:
            return {...state}

        default:
            return state

    }
}