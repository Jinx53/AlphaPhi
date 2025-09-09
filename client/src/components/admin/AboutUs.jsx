import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import { Paper, Box, Input, Grid} from '@mui/material';
import CommonButton from "../common/CommonButton";
import {connect, useDispatch, useSelector} from 'react-redux';
import {getAboutUs, addAboutUs, deleteAboutUs} from '../../actions/AboutAction';
import { clearErrors } from "../../actions/ErrorAction";
import useErrorMessage from "../common/useErrorHook";
import DeleteItem from "../common/DeleteItem";
//import { ThemeProvider } from '@mui/material';
//import { dashboardTheme } from '../../dashboardTheme';


export const AboutUs = (props) => {
    const [title, changeTitle] = useState("");
    const [body, changeBody] = useState("");
    const errorMessage = useErrorMessage("ADD_ABOUT");
    const dispatch = useDispatch();
    
    let onChange = (e) => {
        if (e.target.name === "title") changeTitle(e.target.value);
        if (e.target.name === "body") changeBody(e.target.value);
    }

    useEffect(() => {
        document.title = 'About us';
        props.getAboutUs();
    }, []);


    let onSubmit = (e) => {
        e.preventDefault();

        const about = { title, body };
        props.addAboutUs(about);
        dispatch(clearErrors());
        changeTitle("");
        changeBody("");
    }

    return (
            <Grid item xs={8}>
            About Us
                <Box
                sx={{paddingBottom: '5%'}}
                component="form">
                    <h3>{errorMessage}</h3>
                    <Input type="text" placeholder="Enter about title (optional)" name="title" onChange={onChange} value={title}/>
                    <br/><Input type="text" placeholder="Enter about body" name="body" onChange={onChange} value={body}/>
                    <br/><CommonButton onClick={onSubmit} variant='contained' sx={{}}>Submit</CommonButton>
                </Box>
                <Paper>
                    {props.aboutus.length ? props.aboutus.map((data, i) => 
                        <div key={i} style={{align: 'center'}}>
                            <div style={{paddingLeft: "1em", paddingTop: "1em"}}>
                                <h2>{data.title}</h2>
                                <p>{data.body}</p>
                                <DeleteItem remove={deleteAboutUs} id={data._id}/>
                            </div>
                            <br/>
                        </div>) 
                    : null}
                </Paper>
        </Grid>
    );
}

AboutUs.propTypes = {
    getAboutUs: PropTypes.func,
    addAboutUs: PropTypes.func,
    aboutus: PropTypes.array
};

const mapStateToProps = state => ({
    aboutus: state.aboutus.aboutus
})

export default connect(mapStateToProps, {getAboutUs, addAboutUs})(AboutUs);
