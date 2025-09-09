
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, USER_LOADED, USER_AUTHENTICATED} from "./types";
import {fetch, add} from '../api';
import { returnErrors } from "./ErrorAction";

export const logout = () => {
    return{
        type: LOGOUT_SUCCESS,
    };
}


export const reAuthenticate = () => async (dispatch, getState) => {
    try{
        const token = tokenConfig(getState);
        //dispatch(setLoadingTodos());
        const {data} = await fetch('/admin/user', token);
        dispatch({type: USER_AUTHENTICATED, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch(returnErrors(response.data, response.status, "USER_AUTHENTICATED"));
        dispatch({
            type: LOGOUT_SUCCESS,
        });
    }
}


export const login = (userinfo) => async (dispatch) => {

    try{
        const {data} = await add('/admin', userinfo);
        dispatch({type: LOGIN_SUCCESS, payload: data})
    } catch (err) {
        const {response} = err;
        dispatch({type: LOGIN_FAIL});
        dispatch(returnErrors(response.data, response.status, "LOGIN_FAIL"))
    }
} 


export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {}
    }
    if(token) config.headers['alphaphi-auth-token'] = token;
    return config;
}