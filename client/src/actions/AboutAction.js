import { FETCH_ABOUT, ADD_ABOUT, DELETE_ABOUT, EDIT_ABOUT} from "./types";
import {fetch, add, remove, edit} from '../api';
import { tokenConfig } from "./AuthAction";
import { returnErrors } from "./ErrorAction";

export const getAboutUs = () => async (dispatch) => {
    try{
        //dispatch(setLoadingTodos());
        const {data} = await fetch('/aboutus');
        dispatch({type: FETCH_ABOUT, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "FETCH_ABOUT"));
    }
}

export const addAboutUs = (aboutdata) => async (dispatch, getState) => {
    try{
        const {data} = await add('/aboutus', aboutdata, tokenConfig(getState));
        dispatch({type: ADD_ABOUT, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "ADD_ABOUT"));
    }
}

export const deleteAboutUs = _id => async (dispatch, getState) => {
    try{
        const config = tokenConfig(getState);
        const {data} = await remove(`/aboutus/${_id}`, config);
        dispatch({type: DELETE_ABOUT, payload: _id});
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "DELETE_ABOUT"));
    }
}

export const editAboutUs = (_id, aboutusdata) => async (dispatch, getState) => {
    try {
        const config = tokenConfig(getState);
        const {data} = await edit(`/aboutus/${_id}`, aboutusdata, config);
        dispatch({type: EDIT_ABOUT, payload: {_id, ...aboutusdata}});
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "EDIT_ABOUT"))
    }
}

/* 
export const setLoadingTodos = () => {
    return {
        type: LOADING_TODOS
    }

} */