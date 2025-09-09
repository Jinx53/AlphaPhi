import { FETCH_TOOLS, ADD_TOOL, DELETE_TOOL, EDIT_TOOL, SUBMIT_RENTAL, RENTAL_ERROR } from "./types";
import { fetch, add, remove, edit } from '../api';
import { tokenConfig } from "./AuthAction";
import { returnErrors } from "./ErrorAction";

export const getTools = () => async (dispatch) => {
    try {
        //dispatch(setLoadingTodos());
        const { data } = await fetch('/alpha-tools');
        dispatch({ type: FETCH_TOOLS, payload: data })
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "FETCH_TOOLS"))
    }
}

export const submitRental = (contactus, option) => async (dispatch) => {
    try {
        let text = toText(option);
        let rental = {
            email: contactus.email,
            subject: `Tools rental: ${contactus.subject}`,
            message: `${text}\n${contactus.message}`
        }
        const {data} = await add('/mail', rental);
        dispatch({type: SUBMIT_RENTAL, payload: true})
    } catch (err) {
        const { response } = err;
        dispatch({type: RENTAL_ERROR, payload: false})
        dispatch(returnErrors(response.data, response.status, "RENTAL_ERROR"))
    }
}

export const addTool = (tool) => async (dispatch, getState) => {
    try {
        const config = tokenConfig(getState);
        config.headers["Content-Type"] = "multipart/form-data";
        const { data } = await add('/alpha-tools', tool, config);
        dispatch({ type: ADD_TOOL, payload: data })
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "ADD_TOOL"))
    }
}

export const deleteTool = _id => async (dispatch, getState) => {
    try {
        const config = tokenConfig(getState);
        const { data } = await remove(`/alpha-tools/${_id}`, config);
        dispatch({ type: DELETE_TOOL, payload: _id });
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "DELETE_TOOL"))
    }
}

export const editTool = (tool) => async (dispatch, getState) => {
    try {
        const {_id} = tool;
        const config = tokenConfig(getState);
        config.headers["Content-Type"] = "multipart/form-data";
        const { data } = await edit(`/alpha-tools/${_id}`, tool, config);
        dispatch({ type: EDIT_TOOL, payload: { _id, ...tool } });
    } catch (err) {
        const { response } = err;
        dispatch(returnErrors(response.data, response.status, "EDIT_TOOL"))
    }
}

/* 
export const setLoadingTodos = () => {
    return {
        type: LOADING_TODOS
    }

} */

function toText(arr) {
    let str = "Tool List\n"
    arr.forEach(item => {
        str += `Name: ${item.name}\tQuantity: ${item.quantity}\n`
    });
    return str
}