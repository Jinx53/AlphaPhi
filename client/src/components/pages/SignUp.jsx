import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import {Button, Box, Input} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, signUp } from "../../actions/UsersAction";
import { clearErrors } from "../../actions/ErrorAction";
import useErrorMessage from "../common/useErrorHook";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../common/PasswordInput";

export default function Users(){
    const [fname, changeFname] = useState("");
    const [lname, changeLname] = useState("");
    const [email, changeEmail] = useState("");
    const [password, changePassword] = useState("");
    const [password2, changePassword2] = useState("");
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.users.users);
    const {isAuthenticated} = useSelector(state => state.auth);
    const errorMessage = useErrorMessage("REGISTER_FAIL");
    const navigate = useNavigate();

   useEffect(() => {
    dispatch(getUsers())
    if(isAuthenticated){
        navigate("/");
    }
   }, [isAuthenticated]);


    
    
    let onChange = (e) => {
        if (e.target.name === "fname") changeFname(e.target.value);
        if (e.target.name === "lname") changeLname(e.target.value);
        if (e.target.name === "email") changeEmail(e.target.value);
        if (e.target.name === "password") changePassword(e.target.value);
        if (e.target.name === "password2") changePassword2(e.target.value);
    }

    let onSubmit = (e) => {
        e.preventDefault();

        const user = { fname, lname, email, password, password2 };
       
        dispatch(signUp(user))
        dispatch(clearErrors());
        changeFname("");
        changeLname("");
        changeEmail("");
        changePassword("");
        changePassword2("");
    }

    return (
        <div>
            Sign Up
            <h3>{errorMessage}</h3>
                { allUsers.length ? 
                <Box component="form">
                    <Input type="text" placeholder="Enter user first name" name="fname" onChange={onChange} value={fname}/>
                    <br/><Input type="text" placeholder="Enter user last name" name="lname" onChange={onChange} value={lname}/>
                    <br/><Input type="email" placeholder="Enter user email" name="email" onChange={onChange} value={email}/>
                    <br/><PasswordInput type="password" placeholder="Enter user password" name="password" onChange={onChange} value={password}/>
                    <br/><PasswordInput type="password" placeholder="Enter password again for verification" name="password2" onChange={onChange} value={password2}/>
                </Box>
                : 
                <Box
                component="form">
                    <Input type="text" placeholder="Enter user first name" name="fname" onChange={onChange} value={fname}/>
                    <br/><Input type="text" placeholder="Enter user last name" name="lname" onChange={onChange} value={lname}/>
                    <br/><Input type="email" placeholder="Enter user email" name="email" onChange={onChange} value={email}/>
                    <br/><PasswordInput type="password" placeholder="Enter user password" name="password" onChange={onChange} value={password}/>
                    <br/><PasswordInput type="password" placeholder="Enter password again for verification" name="password2" onChange={onChange} value={password2}/>
                    <Button onClick={onSubmit}>Submit</Button>
                </Box>}
            
        </div>
    );
}
