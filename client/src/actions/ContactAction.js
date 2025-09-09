import { FETCH_CONTACTUS, ADD_CONTACTUS, ADD_CONTACTENQUIRE, DELETE_CONTACTUS, EDIT_CONTACTUS, SET_CONTACTUS_ACTIVE} from "./types";
import {fetch, add, remove, edit} from '../api';
import { tokenConfig } from "./AuthAction";
import { returnErrors } from "./ErrorAction";

export const getContactUs = () => async (dispatch) => {
    try{
        //dispatch(setLoadingTodos());
        const {data} = await fetch('/contactus');
        dispatch({type: FETCH_CONTACTUS, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "FETCH_CONTACTUS"))
    }
}

export const addContactUs = (contactusdata) => async (dispatch, getState) => {
    try{
        const config = tokenConfig(getState);
        const {data} = await add('/contactus', contactusdata, config);
        dispatch({type: ADD_CONTACTUS, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response?.data, response?.status, "ADD_CONTACTUS"))
    }
}

export const addEnquire = (enquiredata) => async (dispatch) => {
    try{
        const {data} = await add('/contactus/mail', enquiredata);
        dispatch({type: ADD_CONTACTENQUIRE, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "ADD_CONTACTENQUIRE"))
    }
}


export const deleteContactUs = _id => async (dispatch, getState) => {
    try{
        const config = tokenConfig(getState);
        const {data} = await remove(`/contactus/${_id}`, config);
        dispatch({type: DELETE_CONTACTUS, payload: _id});
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "DELETE_CONTACTUS"))
    }
}

export const editContactUs = (contactus) => async (dispatch, getState) => {
    try {
        const config = tokenConfig(getState);
        const {_id} = contactus;
        const {data} = await edit(`/contactus/${_id}`, contactus, config);
        dispatch({type: EDIT_CONTACTUS, payload: {_id, ...contactus}});
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "EDIT_CONTACTUS"))
    }
}

export const setContactActive = (contact) => async (dispatch, getState) => {
    try {
        const config = tokenConfig(getState);
        const {_id} = contact;
        const {data} = await edit(`/contactus/setActive/${_id}`, contact, config);
        dispatch({type: SET_CONTACTUS_ACTIVE, payload: {_id, ...contact}});
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "SET_CONTACTUS_ACTIVE"))
    }
}

/* 
export const setLoadingTodos = () => {
    return {
        type: LOADING_TODOS
    }

} */