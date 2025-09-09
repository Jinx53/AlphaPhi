import { FETCH_TESTIMONIAL, ADD_TESTIMONIAL, DELETE_TESTIMONIAL, EDIT_TESTIMONIAL } from "./types";
import { fetch, add, remove, edit } from '../api';
import { tokenConfig } from "./AuthAction";
import { returnErrors } from "./ErrorAction";

export const getTestimonial = () => async (dispatch) => {
    try {
        //dispatch(setLoadingTodos());
        const { data } = await fetch('/testimonial');
        dispatch({ type: FETCH_TESTIMONIAL, payload: data })
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "FETCH_TESTIMONIAL"))
    }
}

export const addTestimonial = (testimonial) => async (dispatch, getState) => {
    try {
        const config = tokenConfig(getState);
        config.headers["Content-Type"] = "multipart/form-data";
        const { data } = await add('/testimonial', testimonial, config);
        dispatch({ type: ADD_TESTIMONIAL, payload: data })
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "ADD_TESTIMONIAL"))
    }
}

export const deleteTestimonial = _id => async (dispatch, getState) => {
    try {
        const config = tokenConfig(getState);
        const { data } = await remove(`/testimonial/${_id}`, config);
        dispatch({ type: DELETE_TESTIMONIAL, payload: _id });
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "DELETE_TESTIMONIAL"))
    }
}

export const editTestimonial = (testimonial) => async (dispatch, getState) => {
    try {
        const {_id} = testimonial;
        const config = tokenConfig(getState);
        config.headers["Content-Type"] = "multipart/form-data";
        const { data } = await edit(`/testimonial/${_id}`, testimonial, config);
        dispatch({ type: EDIT_TESTIMONIAL, payload: { _id, ...testimonial } });
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "EDIT_TESTIMONIAL"))
    }
}

/* 
export const setLoadingTodos = () => {
    return {
        type: LOADING_TODOS
    }

} */
