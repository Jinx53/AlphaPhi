import { FETCH_SERVICES, ADD_SERVICE, DELETE_SERVICE, EDIT_SERVICE} from "./types";
import {fetch, add, remove, edit} from '../api';
import { tokenConfig } from "./AuthAction";
import { returnErrors } from "./ErrorAction";

export const getServices = (url) => async (dispatch) => {
    try{
        //dispatch(setLoadingTodos());
        const {data} = await fetch(`/alpha-services${url ? "/"+url : ""}`);
        dispatch({type: FETCH_SERVICES, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "FETCH_SERVICES"))
    }
}

export const addService = (service) => async (dispatch, getState) => {
    try{
        const config = tokenConfig(getState);
        config.headers["Content-Type"] = "multipart/form-data";
        const {data} = await add('/alpha-services', service, config);
        dispatch({type: ADD_SERVICE, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "ADD_SERVICE"))
    }
}

export const deleteService = _id => async (dispatch, getState) => {
    try{
        const config = tokenConfig(getState);
        const {data} = await remove(`/alpha-services/${_id}`, config);
        dispatch({type: DELETE_SERVICE, payload: _id});
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "DELETE_SERVICE"))
    }
}

export const editService = (_id, service) => async (dispatch, getState) => {
    try {
        const config = tokenConfig(getState);
        const {data} = await edit(`/alpha-services/${_id}`, service, config);
        dispatch({type: EDIT_SERVICE, payload: {_id, ...service}});
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "EDIT_SERVICE"))
    }
}

/* 

export const setLoadingTodos = () => {
    return {
        type: LOADING_TODOS
    }

} */