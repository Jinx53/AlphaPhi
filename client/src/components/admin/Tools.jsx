import React, { useState, useEffect, useRef } from "react";
import { Paper, Button, TextField, Box, Input, Avatar,  useTheme, useMediaQuery } from '@mui/material';
import DeleteItem from "../common/DeleteItem";
import { useSelector, useDispatch } from 'react-redux';
import { getTools, addTool, deleteTool, editTool } from "../../actions/ToolsAction";
import { clearErrors } from "../../actions/ErrorAction";
import useErrorMessage from "../common/useErrorHook";
import Modal from "../common/Modal";

export const Tools = () => {
    const [photo, changePhoto] = useState(null);
    const photoRef = useRef(null);
    const inputRef = useRef(null)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [specification, setSpecification] = useState("");
    const [termsandconditions, setTermsandconditions] = useState("");
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const allTools = useSelector(state => state.toolsState.tools);
    const {isAuthenticated} = useSelector(state => state.auth);
    const [open, setOpen] = useState(0); 
    const errorMessage = useErrorMessage("ADD_TOOL");

    useEffect(() => {
        document.title = 'Tools';
        dispatch(getTools());
    }, []);

    let clearTools = () => {
        dispatch(clearErrors());
        changePhoto(null);
        setName("");
        setDescription("");
        setSpecification("");
        setTermsandconditions("");
        setQuantity(0);
        inputRef.current = null;
        photoRef.current = null;
    }


    let onSubmit = (e) => {
        e.preventDefault();
        const img = photoRef.current;
        const tool = { name, description, quantity, specification, photo: img, termsandconditions };
        dispatch(addTool(tool));
        clearTools();
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        const img = photoRef.current;
        const tool = {_id: open, name, description, quantity, specification, photo: img, localview: photo, termsandconditions };
        dispatch(editTool(tool));
        setOpen(0);
        clearTools();
    }

    let onChange = (e) => {
        if (e.target.name === "photo"){ 
            changePhoto(URL.createObjectURL(e.target.files[0]));
            photoRef.current = e.target.files[0];
        }
        if (e.target.name === "name") setName(e.target.value);
        if (e.target.name === "description") setDescription(e.target.value);
        if (e.target.name === "specification") setSpecification(e.target.value);
        if (e.target.name === "termsandconditions") setTermsandconditions(e.target.value);
        if (e.target.name === "quantity") setQuantity(e.target.value);

    }

    let handleEdit = (data) => {
        const { _id, name, description, specification, termsandconditions, quantity, photo } = data;
        setName(name);
        setDescription(description);
        setSpecification(specification);
        setTermsandconditions(termsandconditions);
        setQuantity(quantity);
        changePhoto(photo);
        setOpen(_id);
    }

    const handleClose = () => {
        setOpen(0);
        clearTools();
    }


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


    let viewTool = (data) => {
        return (
            <Modal
                title={`Edit ${data.name} `}
                open={open === data._id}
                onClose={handleClose}
            >
                    <Input type="text" placeholder="Edit tool name"  value={name} name="name" onChange={onChange}/>
                    <img src={photo} loading="lazy"/>
                <br /><Input type="file" placeholder='Enter photo' name="photo" onChange={onChange} inputRef={inputRef} />
                 <br/><Input type="number" placeholder="Modify quantity" name="quantity" value={quantity} onChange={onChange}/>
                <TextField sx={{width: '100%'}} variant="standard" multiline rows={3} placeholder="Edit specification" name="specification" onChange={onChange} defaultValue={specification} />
                <TextField sx={{width: '100%'}} variant="standard" multiline rows={4} placeholder="Edit tool description" onChange={onChange} name="description" defaultValue={description}  />
                <TextField sx={{width: '100%'}} variant="standard" multiline rows={4} placeholder="Edit terms and condition" onChange={onChange} name="termsandconditions" defaultValue={termsandconditions}  />
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
            <h2>Add tool</h2>
            <Box
                component="form">
                <h3>{errorMessage}</h3>
                <Input type="text" placeholder='Enter tool name' value={name} name="name" onChange={onChange} />
                <br /><label htmlFor="photo">Upload a picture</label>
                <br /><Input type="file" placeholder='Enter photo' name="photo" onChange={onChange} inputRef={inputRef} />
                <br /><Input type="number" placeholder='Enter tool quantity' name="quantity" value={quantity} onChange={onChange}/>
                <br /><TextField sx={{width: '100%'}} variant="standard" multiline rows={4}  placeholder='Enter specification (optional)' name="specification" onChange={onChange} defaultValue={specification} />
                <br /><TextField sx={{width: '100%'}} variant="standard" multiline rows={4}  placeholder='Enter description'  onChange={onChange} name="description" defaultValue={description} />
                <br /><TextField sx={{width: '100%'}} variant="standard" multiline rows={4}  placeholder='Enter terms and conditions (optional)' onChange={onChange} name="termsandconditions" defaultValue={termsandconditions} />
                <br /><Button variant="outlined" color="success" onClick={onSubmit}>Submit</Button>
            </Box>

            <Paper>
                {!!allTools.length && allTools.map((data, i) =>
                    <div key={i} style={phoneStyle ? {} : { align: 'center', height: '12em' }}>
                        {viewTool(data)}
                        <div style={{ paddingLeft: "1em", paddingTop: "1em" }}>
                            <Avatar
                                sx={phoneStyle ? AvatarStylemb : AvatarStyle}
                                variant='rounded'
                                src={data.photo}
                            />
                            <div style={phoneStyle ? cardStylemb : cardStyle}>
                                <p>{data.name}</p>
                                <p>{data.description}</p>
                                <p>{data.specification}</p>
                                <p>{data.quantity}</p>
                                <p>{data.termsandconditions}</p>
                                {isAuthenticated && <DeleteItem remove={deleteTool} id={data._id} /> }
                                <Button color="info" variant={"outlined"} onClick={() => handleEdit(data)} >Edit</Button>
                            </div>
                        </div>
                        <br />
                    </div>
                )}
            </Paper>
        </div>
    );
}

export default Tools