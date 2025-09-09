import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import {Button, Paper, Box, Input, Checkbox, TextField} from '@mui/material';
import MultiTel from '../common/MultiTel';
import {connect} from 'react-redux';
import {getContactUs, addContactUs, deleteContactUs, editContactUs, setContactActive} from '../../actions/ContactAction';
import { clearErrors } from "../../actions/ErrorAction";
import useErrorMessage from "../common/useErrorHook";
import DeleteItem from "../common/DeleteItem";
import Modal from "../common/Modal";

export const ContactUs = (props) => {
    const [body, changeBody] = useState("");
    const [address, changeAddress] = useState("");
    const [phone, changeTel] = useState("");
    const [multitel, changeNumber] = useState([]);
    const [email, changeEmail] = useState("");
    const [telError, onError] = useState(false); 
    const [open, setOpen] = useState(0); 
    const [checked, setchecked] = useState(0);
    const errorMessage = useErrorMessage("ADD_CONTACTUS");

    
    let onChange = (e) => {
        if (e.target.name === "body") changeBody(e.target.value);
        if (e.target.name === "address") changeAddress(e.target.value);
        if (e.target.name === "email") changeEmail(e.target.value);
        if (e.target.name === "tel") changeTel(e.target.value);
    }

    useEffect(() => {
        document.title = 'Contact us';
        props.getContactUs();
    }, []);

    useEffect(() => {
        setCheck(props.contactus);
    }, [props.contactus]);

    let onSubmit = (e) => {
        e.preventDefault();
        const contactus = { address, body, phone, multitel, email };
        props.addContactUs(contactus);
        props.clearErrors();
        onError(false);
        changeBody("");
        changeAddress("");
        changeNumber([]);
        changeEmail("");
        changeTel("");
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        const contactus = { _id: open, address, body, phone, multitel, email };
        props.editContactUs(contactus);
        handleClose()
    }

    let handleEdit = (data) => {
        const { _id, body, address, email, phone } = data;
        changeBody(body);
        changeAddress(address);
        changeEmail(email);
        changeTel(phone);
        setOpen(_id);
    }

    let setCheck = (data) => {
        (data || []).map(({_id, active}) => {
            if (active) setchecked(_id);
        })
    }

    const handleClose = () => {
        setOpen(0);
        changeBody("");
        changeAddress("");
        changeEmail("");
        changeTel("");
        props.clearErrors();
    }

    const handleActiveContact = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        const _id = e.target.id;
        if (_id !== checked) props.setContactActive({_id, active: true});
        setchecked(_id)

    }

    let viewEdit = (data) => {


        return (
            <Modal
                title={"Edit contact us"}
                open={open === data._id}
                onClose={handleClose}
            >
               <TextField sx={{width: '100%'}} variant="standard" multiline rows={4} placeholder="Enter contact body" name="body" onChange={onChange} defaultValue={body} />
                    <br/><TextField sx={{width: '100%'}} variant="standard" multiline rows={3} placeholder="Enter contact address" name="address" onChange={onChange} defaultValue={address} />
                    <br/><Input type="email" placeholder="Enter contact email" name="email" onChange={onChange} value={email}/>
                    <br/>This will be the number that will be attached to the call icon
                    <Input type="tel" placeholder="+234 803 123 9876" pattern="^\+(?:[0-9] ?){6,14}[0-9]$" name="tel" value={phone} onChange={onChange}/>
                    
                <Button variant="contained" sx={{backgroundColor: "green"}} onClick={handleSubmit}>Submit Change</Button>
                <Button variant="contained" 
                    sx={{backgroundColor: "red", '&:hover': {
                        backgroundColor: 'white',
                        borderColor: 'red',
                        boxShadow: '3px 3px red, -1em 0 .4em olive',
                    }}} 
                    onClick={handleClose}>
                        Close
                </Button>
            </Modal>
        )
    }

    return (
        <div>
                <Box
                component="form">
                    Contact Us
                    <h3>{errorMessage}</h3>
                    <br/><Input sx={{height: '4em'}} type="text" placeholder="Enter contact body" name="body" onChange={onChange} value={body} />
                    <br/><Input type="text" placeholder="Enter contact address" name="address" onChange={onChange} value={address}/>
                    <br/><Input type="email" placeholder="Enter contact email" name="email" onChange={onChange} value={email}/>
                    <br/>This will be the number that will be attached to the call icon
                    <Input type="tel" placeholder="+234 803 123 9876" pattern="^\+(?:[0-9] ?){6,14}[0-9]$" name="tel" value={phone} onChange={onChange}/>
                    <br/><MultiTel type="tel" placeholder="+234 803 123 9876 or +1 888 123 7654" pattern="^\+(?:[0-9] ?){6,14}[0-9]$" name="multitel" phone={multitel} onChange={changeNumber} onError={onError} telError={telError}/>
                    <Button onClick={onSubmit}>Submit</Button>
                </Box>
                <Paper>
                    {!!props.contactus.length && props.contactus.map((data, i) => 
                        <div key={i} style={{align: 'center'}}>
                            {viewEdit(data)}
                            <div style={{paddingLeft: "1em", paddingTop: "1em"}}>
                                <p>{data.body}</p>
                                <p>{data.address}</p>   
                                <p>{data.email}</p>  
                                <p>{data?.phone}</p>  
                                <p>{(data?.multitel||[]).join(", ")}</p>
                                <Checkbox value={data._id}  id={data._id} checked={data._id === checked}  onChange={handleActiveContact} 
                                    inputProps={{ 'aria-label': 'Check contact information to use',}}
                                /> Check an option to use on the public contact page<br/>
                                {!(data.active) && <DeleteItem remove={deleteContactUs} id={data._id}/>}
                                <Button color="info" variant={"outlined"} onClick={() => handleEdit(data)} >Edit</Button>
                            </div>
                            <br/>
                        </div>) 
                    }
                </Paper>  
        </div>
    );
}


ContactUs.propTypes = {
    getContactUs: PropTypes.func,
    addContactUs: PropTypes.func,
    contactus: PropTypes.array
};

const mapStateToProps = state => ({
    contactus: state.contactus.contactus,
    error: state.error
})

export default connect(mapStateToProps, {getContactUs, addContactUs, editContactUs, setContactActive, clearErrors})(ContactUs);

