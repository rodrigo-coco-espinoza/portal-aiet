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
} from '../actions/pc_isla/types'

const initialState = {
    institucionesOptions: [],
    ministeriosOptions: [],
    encargadosPcIslaOptions: [],
    proyectosPcIsla: [],
    personasInstitucion: [],
}

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