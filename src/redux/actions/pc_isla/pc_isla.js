import axios from 'axios'
import {
    ADD_PROYECTO_SUCCESS,
    ADD_PROYECTO_FAIL,
    GET_INSTITUCIONES_OPTIONS_SUCCESS,
    GET_INSTITUCIONES_OPTIONS_FAIL,
    ADD_INSTITUCION_SUCCESS,
    ADD_INSTITUCION_FAIL,
    GET_ENCARGADOS_PC_ISLA_SUCCESS,
    GET_ENCARGADOS_PC_ISLA_FAIL,
    GET_PROYECTOS_FAIL,
    GET_PROYECTOS_SUCCESS,
    UPDATE_ENCARGADOS_SII_SUCCESS,
    UPDATE_ENCARGADOS_SII_FAIL,
    RECHAZAR_PROYECTO_FAIL,
    RECHAZAR_PROYECTO_SUCCESS,
    ACEPTAR_PROYECTO_SUCCESS,
    ACEPTAR_PROYECTO_FAIL,
    GET_PERSONAS_INSTITUCION_SUCCESS,
    GET_PERSONAS_INSTITUCION_FAIL,
    ADD_PERSONA_INSTITUCION_SUCCESS,
    ADD_PERSONA_INSTITUCION_FAIL,
    GET_BLOQUES_OCUPADOS_SUCCESS,
    GET_BLOQUES_OCUPADOS_FAIL,
    ADD_PROTOCOLO_SUCCESS,
    ADD_PROTOCOLO_FAIL,
} from './types'


export const add_proyecto = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    }
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/pc_isla/add_proyecto`, formData, config)
        if (res.status === 200){
            dispatch({
                type: ADD_PROYECTO_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: ADD_PROYECTO_FAIL
            })
        }
    } catch(err){
        dispatch({
            type: ADD_PROYECTO_FAIL
        })
    }
}

export const add_institucion = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/pc_isla/add_institucion`, formData, config)
        if (res.status === 200){
            dispatch({
                type: ADD_INSTITUCION_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: ADD_INSTITUCION_FAIL
            })
        }
    } catch(err){
        dispatch({
            type: ADD_INSTITUCION_FAIL
        })
    }
}


export const get_instituciones_options = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pc_isla/get_instituciones_options`, config)

        if (res.status === 200){
            dispatch({
                type: GET_INSTITUCIONES_OPTIONS_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_INSTITUCIONES_OPTIONS_FAIL
            })
        }
    } catch(err){
        dispatch({
            type: GET_INSTITUCIONES_OPTIONS_FAIL
        })
    }
}

export const get_encargados_pc_isla_options = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/get_encargados_pc_isla`, config);

        if (res.status === 200){
            dispatch({
                type: GET_ENCARGADOS_PC_ISLA_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ENCARGADOS_PC_ISLA_FAIL
            });
        }
    } catch(err){
        dispatch({
            type: GET_ENCARGADOS_PC_ISLA_FAIL
        });
    }
}

export const get_proyectos = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pc_isla/get_proyectos`, config);

        if (res.status === 200){
            dispatch({
                type: GET_PROYECTOS_SUCCESS,
                payload: res.data
            });
        }

    } catch(err){
        dispatch({
            type: GET_PROYECTOS_FAIL
        });
    }
};

export const update_encargados_sii = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/pc_isla/update_encargados_sii/`, formData, config);
        if (res.status === 200){
            dispatch({
                type: UPDATE_ENCARGADOS_SII_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: UPDATE_ENCARGADOS_SII_FAIL
            });
        }
    } catch(err){
        dispatch({
            type: UPDATE_ENCARGADOS_SII_FAIL
        });
    }
}

export const rechazar_proyecto = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/pc_isla/rechazar_proyecto/`, formData, config);
        if (res.status === 200){
            dispatch({
                type: RECHAZAR_PROYECTO_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: RECHAZAR_PROYECTO_FAIL
            });
        }

    } catch(err) {
        dispatch({
            type: RECHAZAR_PROYECTO_FAIL
        })
    }
}

export const aceptar_proyecto = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/pc_isla/aceptar_proyecto/`, formData, config);
        if (res.status === 200){
            dispatch({
                type: ACEPTAR_PROYECTO_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: ACEPTAR_PROYECTO_FAIL
            });
        }

    } catch(err) {
        dispatch({
            type: ACEPTAR_PROYECTO_FAIL
        })
    }
}

export const get_personas_institucion = (institucion_id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    
    try {
        
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pc_isla/personas_institucion/${institucion_id}/`, config);
        if (res.status === 200){
            dispatch({
                type: GET_PERSONAS_INSTITUCION_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PERSONAS_INSTITUCION_FAIL
            });
        }

    } catch(err){
        dispatch({
            type: GET_PERSONAS_INSTITUCION_FAIL
        });
    }
};


export const add_persona_institucion = (formData, institucion_id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/pc_isla/personas_institucion/${institucion_id}/`, formData, config)
        if (res.status === 200){
            dispatch({
                type: ADD_PERSONA_INSTITUCION_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: ADD_PERSONA_INSTITUCION_FAIL
            })
        }
    } catch(err){
        dispatch({
            type: ADD_PERSONA_INSTITUCION_FAIL
        })
    }
}

export const add_protocolo = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };
    console.log(formData)

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/pc_isla/add_protocolo/`, formData, config);
        if (res.status === 200) {
            dispatch({
                type: ADD_PROTOCOLO_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: ADD_PROTOCOLO_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: ADD_PROTOCOLO_FAIL
        });
    }

}


export const get_bloques_ocupados = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    
    try {
        
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pc_isla/get_bloques_ocupados/`, config);
        if (res.status === 200){
            dispatch({
                type: GET_BLOQUES_OCUPADOS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_BLOQUES_OCUPADOS_FAIL
            });
        }

    } catch(err){
        dispatch({
            type: GET_BLOQUES_OCUPADOS_FAIL
        });
    }
};
