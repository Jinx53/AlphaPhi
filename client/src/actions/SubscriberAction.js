import { FETCH_SUBSCRIBER, ADD_SUBSCRIBER, DELETE_SUBSCRIBER, EDIT_SUBSCRIBER } from "./types";
import { fetch, add, remove, edit } from '../api';
import { tokenConfig } from "./AuthAction";
import { returnErrors } from "./ErrorAction";

export const getSubscriber = () => async (dispatch) => {
    try {
        //dispatch(setLoadingTodos());
        const { data } = await fetch('/subscribers');
        dispatch({ type: FETCH_SUBSCRIBER, payload: data })
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "FETCH_SUBSCRIBER"))
    }
}

export const addSubscriber = (subscriber) => async (dispatch, getState) => {
    try {
        const config = tokenConfig(getState);
        const { data } = await add('/subscribers', subscriber, config);
        dispatch({ type: ADD_SUBSCRIBER, payload: data })
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "ADD_SUBSCRIBER"))
    }
}

export const deleteSubscriber = _id => async (dispatch, getState) => {
    try {
        const config = tokenConfig(getState);
        const { data } = await remove(`/subscribers/${_id}`, config);
        dispatch({ type: DELETE_SUBSCRIBER, payload: _id });
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "DELETE_SUBSCRIBER"))
    }
}

export const editSubscriber = (subscriber) => async (dispatch, getState) => {
    try {
        const {_id} = subscriber;
        const config = tokenConfig(getState);
        const { data } = await edit(`/subscribers/${_id}`, subscriber, config);
        dispatch({ type: EDIT_SUBSCRIBER, payload: { _id, ...subscriber } });
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "EDIT_SUBSCRIBER"))
    }
}

/* 
export const setLoadingTodos = () => {
    return {
        type: LOADING_TODOS
    }

} */
