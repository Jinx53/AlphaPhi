import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { Button } from '@mui/material';
import React from 'react';


export default function DeleteItem({remove, id}){
    const dispatch = useDispatch();

    function deleteItem(_id){
        return (
            <Button variant="outlined" color="error" onClick={() => dispatch(remove(_id))}>Delete</Button>
        )
    }

    return deleteItem(id)
}