import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import {Button, Box, Input} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {login} from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";
import {clearErrors} from "../../actions/ErrorAction";
import useErrorMessage from "../common/useErrorHook";
import PasswordInput from "../common/PasswordInput";


export default function Login(){
    const [email, changeEmail] = useState("");
    const [password, changePassword] = useState("");
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const errorMessage = useErrorMessage("LOGIN_FAIL");

     useEffect(() => {
        if(isAuthenticated){
            navigate("/");
        }

    }, [isAuthenticated]);
 

    let onChange = (e) => {
        if (e.target.name === "email") changeEmail(e.target.value);
        if (e.target.name === "password") changePassword(e.target.value);
    }

    let onSubmit = (e) => {
        e.preventDefault();
        const user = { email, password };
        dispatch(clearErrors());
        dispatch(login(user));
        changeEmail("");
        changePassword("");
    }

    return (
        <div>
            Login
            <h3>{errorMessage}</h3>
                <Box
                component="form">
                    <br/><Input type="email" placeholder="Enter user email" name="email" onChange={onChange} value={email}/>
                    <br/><PasswordInput type="password" placeholder="Enter user password" name="password" onChange={onChange} value={password}/>
                    <Button onClick={onSubmit}>Submit</Button>
                </Box>
        </div>
    );
}


Login.propTypes = {
    login: PropTypes.func,
    clearErrors: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object
}

