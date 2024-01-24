import axios from 'axios'
import {
    GET_QUERIES_SUCCESS,
    GET_QUERIES_FAIL,
    GET_COMBOBOX_SUCCES,
    GET_COMBOBOX_FAIL,
    EDIT_QUERY_SUCCESS,
    EDIT_QUERY_FAIL,
    ADD_QUERY_SUCCESS,
    ADD_QUERY_FAIL,
    DELETE_QUERY_SUCCESS,
    DELETE_QUERY_FAIL,
    DELETE_NOTA_SUCCESS,
    DELETE_NOTA_FAIL,
    ADD_NOTA_SUCCESS,
    ADD_NOTA_FAIL,
} from './types'

export const get_queries = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/buscador/list`, config)

        if (res.status === 200){
            dispatch({
                type: GET_QUERIES_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_QUERIES_FAIL
            })
        }

    } catch(err){
        dispatch({
            type: GET_QUERIES_FAIL
        });
    }
}

export const get_combobox = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/buscador/combobox_options`, config)

        if (res.status === 200){
            dispatch({
                type: GET_COMBOBOX_SUCCES,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_COMBOBOX_FAIL
            });
        }
    } catch (err){
        dispatch({
            type: GET_COMBOBOX_FAIL
        });
    }
}

export const edit_query = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/buscador/edit_query`, formData, config)
        if (res.status === 200){
            dispatch({
                type: EDIT_QUERY_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: EDIT_QUERY_FAIL
            })
        }
    } catch (err){
        dispatch({
            type: EDIT_QUERY_FAIL
        });
        
    }
}

export const add_query = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/buscador/edit_query`, formData, config)
        if (res.status === 200){
            dispatch({
                type: ADD_QUERY_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: ADD_QUERY_FAIL
            })
        }
    } catch(err){
        dispatch({
            type: ADD_QUERY_FAIL
        })
    }
}

export const delete_query = (id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/buscador/delete_query/${id}`, config)


        if (res.status === 200){
            dispatch({
                type: DELETE_QUERY_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: DELETE_QUERY_FAIL
            })
        }

    } catch(err){
        dispatch({
            type: DELETE_QUERY_FAIL
        })
    }
}

export const delete_nota = (id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/buscador/delete_nota/${id}`, config)

        if (res.status === 200){
            dispatch({
                type: DELETE_NOTA_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: DELETE_NOTA_FAIL
            })
        }
    } catch(err){
        dispatch({
            type: DELETE_NOTA_FAIL
        })
    }

   
}

export const add_nota = (formData) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/buscador/add_nota`, formData, config)
        if (res.status === 200){
            dispatch({
                type: ADD_NOTA_SUCCESS,
                payload: res.data
            })
            return res.data
        } else {
            dispatch({
                type: ADD_NOTA_FAIL
            })
        }
    } catch (err){
        dispatch({
            type: ADD_NOTA_FAIL
        })
    }
}