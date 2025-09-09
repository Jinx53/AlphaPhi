import { FETCH_USERS, REGISTER_SUCCESS, ADD_USER, DELETE_USER, REGISTER_FAIL, AUTH_ERROR, UPDATE_EMAIL, RESET_PASSWORD, CHANGE_PASSWORD} from "./types";
import {fetch, add, remove, edit} from '../api';
import { tokenConfig } from "./AuthAction";
import { returnErrors } from "./ErrorAction";

export const getUsers = () => async (dispatch) => {
    try{
        //dispatch(setLoadingTodos());
        const {data} = await fetch('/users');
        dispatch({type: FETCH_USERS, payload: data});
    } catch (err) {
        const {response} = err;
        dispatch({type: AUTH_ERROR});
        dispatch(returnErrors(response.data, response.status, "AUTH_ERROR"));
    }
}

export const addUser = (user) => async (dispatch) => {
    try{
        const {data} = await add('/users', user);
        dispatch({type: ADD_USER, payload: data})
    } catch (err) {
        const {response} = err;

        dispatch({type: REGISTER_FAIL})
        dispatch(returnErrors(response.data, response.status, "REGISTER_FAIL"));
    }
}



export const signUp = (user) => async (dispatch) => {
    try{
        const {data} = await add('/users/signup', user);
        dispatch({type: REGISTER_SUCCESS, payload: data});
    } catch (err) {
        const {response} = err;
        dispatch({type: REGISTER_FAIL})
        dispatch(returnErrors(response.data, response.status, "REGISTER_FAIL"));
    }
}

export const deleteUser = _id => async (dispatch, getState) => {
    const config = tokenConfig(getState);
    try {
        const {data} = await remove(`/users/${_id}`, config);
        dispatch({type: DELETE_USER, payload: _id});

    }catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "DELETE_USER"));

    }
}

//update password - done
//update email - done
//send temp pass & forgot pass from login in- todo
export const updateEmail = ({_id, email}) => async (dispatch, getState) => {
    const config = tokenConfig(getState);

    try {
        const {data} = await edit(`/users/${_id}`, {email}, config);
        dispatch({type: UPDATE_EMAIL, payload: {_id, email, success: data.success}});
    } catch (error) {
        const {response} = error;
        dispatch(returnErrors(response.data, response.status, "UPDATE_EMAIL"));
    } 
}

export const resetPassword = (_id) => async (dispatch, getState) => {
    const config = tokenConfig(getState);
    
    try {
        const {data} = await add(`/users/resetpassword`, {_id}, config);
        dispatch({type: RESET_PASSWORD, payload: {success: data.success}});
    } catch (error) {
        const {response} = error;
        dispatch(returnErrors(response.data, response.status, "RESET_PASSWORD"));
    }
}

export const passwordChange = (userdata) => async (dispatch, getState) => {
    const config = tokenConfig(getState);

    try {
        const {data} = await add(`/users/passwordchange`, userdata, config);
        dispatch({type: CHANGE_PASSWORD, payload: data.success});
    } catch (error) {
        const {response} = error;
        dispatch(returnErrors(response.data, response.status, "CHANGE_PASSWORD"));
    } 
}

/* 
//send user email to change password
export const setLoadingTodos = () => {
    return {
        type: LOADING_TODOS
    }

} */