import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import {Button, Box, Input} from '@mui/material';

export default function FormBox({sx, changeTitle, changeBody, changePhoto, changeFooter, onSubmit, pageTitle, errorMessage, title, body, footer, inputRef}){

    let onChange = (e) => {
        if (e.target.name === "title") changeTitle(e.target.value);
        if (e.target.name === "body") changeBody(e.target.value);
        if (e.target.name === "photo") changePhoto(e.target.files[0]);
        if (e.target.name === "footer") changeFooter(e.target.value);
    }

    return (
        <div>
            {pageTitle}
                <Box
                sx={sx}
                component="form">
                <h3>{errorMessage}</h3>
                    <Input type="text" placeholder='Enter title (optional)' name="title" onChange={onChange} value={title}/>
                    <br/><Input type="text" placeholder='Enter body' name="body" onChange={onChange} value={body}/>
                    <br/><label htmlFor="photo">Upload a picture</label>
                    <br/><Input type="file" placeholder='Enter photo' name="photo" onChange={onChange} inputRef={inputRef}/>
                    <br/><Input type="text" placeholder='Enter footer' name="footer" onChange={onChange} value={footer}/>
                    <br/><Button variant="outlined" color="success" onClick={onSubmit}>Submit</Button>
                </Box>
            
        </div>
    );
}
