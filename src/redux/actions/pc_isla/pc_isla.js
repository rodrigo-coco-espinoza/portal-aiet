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
    GET_JORNADAS_MINHACIENDA_SUCCESS,
    UPDATE_JORNADAS_MINHACIENDA_FAIL,
    UPDATE_JORNADAS_MINHACIENDA_SUCCESS,
    GET_CALENDARIO_PC_ISLA_SUCCESS,
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

export const get_jornadas_minhacienda = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        //    'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pc_isla/jornadas_minhacienda/`, config);
    dispatch({
        type: GET_JORNADAS_MINHACIENDA_SUCCESS,
        payload: res.data
    });
};

export const update_jornadas_minhacienda = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/pc_isla/jornadas_minhacienda/`, formData, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_JORNADAS_MINHACIENDA_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: UPDATE_JORNADAS_MINHACIENDA_FAIL
            });
        }

    } catch(err) {
        dispatch({
            type: UPDATE_JORNADAS_MINHACIENDA_FAIL
        });
    }
};

export const get_calendario_pc_isla = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pc_isla/calendario_pc_isla/`, config);
    dispatch({
        type: GET_CALENDARIO_PC_ISLA_SUCCESS,
        payload: res.data
    });

};

export const get_asistencias = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pc_isla/get_asistencias/`, config);
    dispatch({
        type: GET_ASISTENCIA_SUCCESS,
        payload: res.data
    });
};

export const registrar_ingreso = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/pc_isla/registrar_ingreso/`, formData, config);
    dispatch({
        type: REGISTRAR_INGRESO_SUCCESS,
        payload: res.data
    });

};

export const registrar_salida = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };

    const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/pc_isla/registrar_salida/`, formData, config);
    dispatch({
        type: REGISTRAR_SALIDA_SUCCESS,
        payload: res.data
    });
};

export const add_jornada_extra = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/pc_isla/add_jornada_extra/`, formData, config);
    dispatch({
        type: ADD_JORNADA_EXTRA_SUCCES,
        payload: res.data
    });

};

export const finalizar_proyecto = (idProyecto) => async dispatch => {
    
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/pc_isla/finalizar_proyecto/`, {idProyecto: idProyecto}, config);
    dispatch({
        type: FINALIZAR_PROYECTO_SUCCESS,
        payload: res.data
    });


};

export const extender_proyecto = (formData) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/pc_isla/extender_proyecto/`, formData, config);
    dispatch({
        type: EXTENDER_PROYECTO_SUCCESS,
        payload: res.data
    });
};

export const informe_asistencia = (idProyecto, mes) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pc_isla/informe_asistencia/${idProyecto}/${mes}/`, config);

    return res.data;
    
}

export const get_proyectos_finalizados = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pc_isla/get_proyectos_finalizados/`, config);

        if (res.status === 200){
            dispatch({
                type: GET_PROYECTOS_FINALIZADOS_SUCCESS,
                payload: res.data
            });
        }

    } catch(err){
        dispatch({
            type: GET_PROYECTOS_FINALIZADOS_FAIL
        });
    }
};

export const update_protocolo = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/pc_isla/update_protocolo/`, formData, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PROTOCOLO_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: UPDATE_PROTOCOLO_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: UPDATE_PROTOCOLO_FAIL
        });
    }
};

export const update_extension = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/pc_isla/update_extension/`, formData, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_EXTENSION_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: UPDATE_EXTENSION_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: UPDATE_EXTENSION_FAIL
        });
    }
};

export const get_all_proyectos_finalizados = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pc_isla/get_all_proyectos_finalizados/`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ALL_PROYECTOS_FINALIZADOS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ALL_PROYECTOS_FINALIZADOS_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: GET_ALL_PROYECTOS_FINALIZADOS_FAIL
        });
    }
};

export const add_extraccion = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data',
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/pc_isla/add_extraccion/`, formData, config);
        if (res.status === 200) {
            dispatch({
                type: ADD_EXTRACCION_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: ADD_EXTRACCION_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: ADD_EXTRACCION_FAIL
        });
    }
};

export const delete_extraccion = (extraccion_id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/pc_isla/delete_extraccion/${extraccion_id}/`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_EXTRACCION_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: DELETE_EXTRACCION_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: DELETE_EXTRACCION_FAIL
        });
    }
};
