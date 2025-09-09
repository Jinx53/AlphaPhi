import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import {Avatar, Paper, useTheme, useMediaQuery} from '@mui/material';
import DeleteItem from "./DeleteItem";
import React from 'react';

export default function IDCard({sx, allData, remove}){
    const {isAuthenticated} = useSelector(state => state.auth);
    
    const cardStyle = {
        display: 'grid',
        gridAutoColumns: 'auto',
        paddingLeft: '2em'
    } 

    const cardStylemb = {
        display: 'grid',
        gridAutoColumns: 'auto',
        paddingLeft: '1em'
    } 
    
    const AvatarStyle = {
        width: '10em', 
        height: '8em', 
        float: 'left'
    }

    const AvatarStylemb = {
        width: 'auto', 
        height: 'auto',
    }

    const theme = useTheme();
  
    const phoneStyle = useMediaQuery(theme.breakpoints.down('laptop'));

    return (
        <Paper>
            {allData.length ? allData.map((data, i) => 
            <div key={i} style={phoneStyle ? {} : {align: 'center', height: '12em'}}>
                <div style={{paddingLeft: "1em", paddingTop: "1em"}}>
                    <Avatar
                        sx={phoneStyle ? AvatarStylemb : AvatarStyle}
                        variant='rounded'
                        src={data.photo}
                    />
                    <div style={phoneStyle ? cardStylemb : cardStyle}>
                        <p>{data.title}</p>
                        <p>{data.body}</p>
                        <p>{data.footer}</p>
                        {isAuthenticated ? <DeleteItem remove={remove} id={data._id}/>: null}
                    </div>
                </div>
                <br/>
            </div>) 
            : null}
        </Paper>
    );
}
