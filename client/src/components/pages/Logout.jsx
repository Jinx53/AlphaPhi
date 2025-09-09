import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import {logout} from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import React from 'react';

export default function Logout(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOut = () => {
        navigate("/");
        dispatch(logout());
    }

    return (
        <div>
            <Button variant="text" color="error" onClick={signOut}>Sign Out</Button>
        </div>
    );
}

Logout.propTypes = {
    logout: PropTypes.func,
}

