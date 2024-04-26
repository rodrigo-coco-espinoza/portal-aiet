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
} from '../actions/pc_isla/types'

const initialState = {
    institucionesOptions: [],
    ministeriosOptions: [],
    encargadosPcIslaOptions: [],
    proyectosPcIsla: [],
    personasInstitucion: [],
    bloquesOcupados: {},
    jornadasHacienda: [],
    calendario: [],
    asistencias: [],
};

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
            const proyectosPcIslaEncargados = [...state.proyectosPcIsla];
            // Encontrar institución en el estado
            const existingInstitucionIndexEncargados = proyectosPcIslaEncargados.findIndex((inst) => inst.id_institucion === payload.institucion);
            // Encontrar proyecto
            if (existingInstitucionIndexEncargados !== -1) {
                const proyectoIndex = proyectosPcIslaEncargados[existingInstitucionIndexEncargados].proyectos.findIndex((proyecto) => proyecto.id === payload.proyectoActualizado.id);
        
                // Verificar si se encontró el proyecto
                if (proyectoIndex !== -1) {
                    // Reemplazar el proyecto actualizado
                    proyectosPcIslaEncargados[existingInstitucionIndexEncargados].proyectos[proyectoIndex] = payload.proyectoActualizado;
                }
            }

            return {
                ...state,
                proyectosPcIsla: proyectosPcIslaEncargados,
            };
        case RECHAZAR_PROYECTO_SUCCESS:
            const proyectosPcIslaRechazado = [...state.proyectosPcIsla];
            // Encontrar institución
            const existingInstitucionIndexRechazado = proyectosPcIslaRechazado.findIndex((inst) => inst.id_institucion === payload.institucion);
            // Encontrar proyecto
            if (existingInstitucionIndexRechazado !== -1) {
                const proyectoIndex = proyectosPcIslaRechazado[existingInstitucionIndexRechazado].proyectos.findIndex((proyecto) => proyecto.id === payload.proyectoRechazado.id);
                // Reemplazar el proyecto rechazado
                if (proyectoIndex !== -1) {
                    proyectosPcIslaRechazado[existingInstitucionIndexRechazado].proyectos[proyectoIndex] = payload.proyectoRechazado;
                }
            }

            return {
                ...state,
                proyectosPcIsla: proyectosPcIslaRechazado
            };
        case ACEPTAR_PROYECTO_SUCCESS:
            const proyectosPcIslaAceptado = [...state.proyectosPcIsla];
            // Encontrar institución
            const existingInstitucionIndexAceptado = proyectosPcIslaAceptado.findIndex((inst) => inst.id_institucion === payload.institucion);
            // Encontrar proyecto
            if (existingInstitucionIndexAceptado !== -1) {
                const proyectoIndex = proyectosPcIslaAceptado[existingInstitucionIndexAceptado].proyectos.findIndex((proyecto) => proyecto.id === payload.proyectoAceptado.id);
                // Reemplazar el proyecto rechazado
                if (proyectoIndex !== -1) {
                    proyectosPcIslaAceptado[existingInstitucionIndexAceptado].proyectos[proyectoIndex] = payload.proyectoAceptado;
                }
            }

            return {
                ...state,
                proyectosPcIsla: proyectosPcIslaAceptado
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
            const proyectosPcIslaProtocolo = [...state.proyectosPcIsla];
            // Encontrar institución
            const institucionIndexProtocolo = proyectosPcIslaProtocolo.findIndex((inst) => inst.id_institucion === payload.id_institucion);
            // Encontrar proyecto
            if (institucionIndexProtocolo !== 1) {
                const proyectoIndex = proyectosPcIslaProtocolo[institucionIndexProtocolo].proyectos.findIndex((proyecto) => proyecto.id === payload.proyecto_actualizado.id);
                if (proyectoIndex !== 1) {
                    proyectosPcIslaProtocolo[institucionIndexProtocolo].proyectos[proyectoIndex] = payload.proyecto_actualizado;
                }           
            }

            // Actualizar jornadas de Hacienda si corresponde
            let jornada_update = state.jornadasHacienda;
            if (payload.jornada_minhacienda) {
                jornada_update = payload.jornada_minhacienda;
            }

            return {
                ...state,
                proyectosPcIsla: proyectosPcIslaProtocolo,
                bloquesOcupados: payload.bloquesOcupados,
                jornadasHacienda: jornada_update,
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

            const updatedProyectosHacienda = [...state.proyectosPcIsla];
            // Encontrar institucion en el estado
            const haciendaIndex = updatedProyectosHacienda.findIndex((inst) => inst.id_institucion === payload.proyectos_minhacienda.id_institucion);
            updatedProyectosHacienda[haciendaIndex] = payload.proyectos_minhacienda

            return {
                ...state,
                proyectosPcIsla: updatedProyectosHacienda,
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
        case UPDATE_ENCARGADOS_SII_FAIL:
            return {...state}

        default:
            return state

    }
}