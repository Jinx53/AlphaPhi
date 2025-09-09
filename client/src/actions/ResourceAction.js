import { FETCH_RESOURCETEAM, ADD_RESOURCETEAM, DELETE_RESOURCETEAM, EDIT_RESOURCETEAM} from "./types";
import {fetch, add, remove, edit} from '../api';
import { tokenConfig } from "./AuthAction";
import { returnErrors } from "./ErrorAction";

export const getResourceTeam = () => async (dispatch) => {
    try{
        //dispatch(setLoadingTodos());
        const {data} = await fetch('/resourceteam');
        dispatch({type: FETCH_RESOURCETEAM, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "FETCH_RESOURCETEAM"))
    }
}

export const addResourceTeam = (resourceteam) => async (dispatch, getState) => {
    try{
        const config = tokenConfig(getState);
        config.headers["Content-Type"] = "multipart/form-data";
        
        const {data} = await add('/resourceteam', resourceteam, config);
        dispatch({type: ADD_RESOURCETEAM, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "ADD_RESOURCETEAM"))
    }
}

export const deleteResourceTeam = _id => async (dispatch, getState) => {
    try{
        const config = tokenConfig(getState);
        const {data} = await remove(`/resourceteam/${_id}`, config);
        dispatch({type: DELETE_RESOURCETEAM, payload: _id});
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "DELETE_RESOURCETEAM"))
    }
}

export const editResourceTeam = (resourceteam) => async (dispatch, getState) => {
    try {
        const {_id} = resourceteam;
        const config = tokenConfig(getState);
        config.headers["Content-Type"] = "multipart/form-data";
        const {data} = await edit(`/resourceteam/${_id}`, resourceteam, config);
        dispatch({type: EDIT_RESOURCETEAM, payload: {_id, ...resourceteam}});
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "EDIT_RESOURCETEAM"))
    }
}

/* export const setLoadingTodos = () => {
    return {
        type: LOADING_TODOS
    }

}  */