import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import FormBox from "../common/FormBox";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { connect } from 'react-redux';
import { Button, Input, TextField, Paper, InputAdornment, IconButton } from '@mui/material';
import { getResourceTeam, addResourceTeam, deleteResourceTeam, editResourceTeam } from "../../actions/ResourceAction";
import { clearErrors } from "../../actions/ErrorAction";
import useErrorMessage from "../common/useErrorHook";
import DeleteItem from "../common/DeleteItem";
import Modal from "../common/Modal";

export const ResourceTeam = (props) => {
    const [name, changeName] = useState("");
    const [role, changeRole] = useState("");
    const [duty, changeDuty] = useState("");
    const [photo, changePhoto] = useState({});
    const inputRef = useRef(null);
    const photoRef = useRef(null);
    const errorMessage = useErrorMessage("ADD_RESOURCETEAM");
    const [open, setOpen] = useState(0);

    useEffect(() => {
        document.title = 'Resource Team';
        props.getResourceTeam();
    }, []);

    let onSubmit = (e) => {
        e.preventDefault();
        const img = photoRef.current;
        const resource = { name, role, photo: img, duty };
        props.addResourceTeam(resource);
        clearResourceInfo();
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        const img = photoRef.current;
        const resource = { _id: open, name, photo: img, localview: photo, role, duty };
        props.editResourceTeam(resource);
        clearResourceInfo();
    }

    let clearResourceInfo = () => {
        props.clearErrors();
        changeName("");
        changeRole("");
        URL.revokeObjectURL(photo)
        changePhoto({});
        changeDuty("");
        setOpen(0);
        photoRef.current = null;
        inputRef.current = null;
    }

    let handleOpen = () => {
        setOpen(1);
    }

    const handleClose = () => {
        setOpen(0);
        clearResourceInfo();
    }

    let handleEdit = (data) => {
        const { _id, name, role, duty, photo } = data;
        changeName(name);
        changeRole(role);
        changeDuty(duty);
        changePhoto(photo);
        setOpen(_id);
    }


    let onChange = (e) => {
        if (e.target.name === "photo" && !!e.target.files.length) {
            changePhoto(URL.createObjectURL(e.target.files[0] || {}));
            photoRef.current = e.target.files[0];
        }
        if (e.target.name === "name") changeName(e.target.value);
        if (e.target.name === "role") changeRole(e.target.value);
        if (e.target.name === "duty") changeDuty(e.target.value);

    }

    let handleUpload = () => {
        document.getElementById('choose-file').click();
    }

    let addTeam = () => {
        return (
            <Modal
                title={`Add team`}
                open={open === 1}
                onClose={handleClose}
            >
                <Input type="text" placeholder="Team name (title, first name, last name)" value={name} name="name" onChange={onChange} />
                <img src={photo} loading="lazy" />
                <br /><>
                    <label htmlFor="choose-file">
                        <IconButton onClick={handleUpload} aria-label="upload">
                            <UploadFileIcon /> Click to upload img
                        </IconButton>
                    </label>
                    <Input id="choose-file" sx={{ display: "none" }} type="file" placeholder='Enter photo' name="photo" onChange={onChange} inputRef={inputRef} />
                </>
                <br /><Input type="text" placeholder="Role (Chief Executive Officer)" name="role" value={role} onChange={onChange} />
                <TextField sx={{ width: '100%' }} variant="standard" multiline rows={3} placeholder="Duty" name="duty" onChange={onChange} defaultValue={duty} />
                <Button variant="contained" sx={{ backgroundColor: "green" }} onClick={onSubmit}>Submit Change</Button>
                <Button variant="contained"
                    sx={{
                        backgroundColor: "red", '&:hover': {
                            backgroundColor: 'white',
                            borderColor: 'red',
                            boxShadow: '3px 3px red, -1em 0 .4em olive',
                        }
                    }}
                    onClick={handleClose}>
                    Close
                </Button>
            </Modal>
        )
    }

    let editTeam = (data) => {
        return (
            <Modal
                title={`Edit team ${data.name} `}
                open={open === data._id}
                onClose={handleClose}
            >
                <Input type="text" placeholder="Edit Team name (title, first name, last name)" value={name} name="name" onChange={onChange} />
                <img src={photo} loading="lazy" />
                <br /><Input type="file" placeholder='Edit photo' name="photo" onChange={onChange} inputRef={inputRef} />
                <br /><Input type="text" placeholder="Edit role (Chief Executive Officer)" name="role" value={role} onChange={onChange} />
                <TextField sx={{ width: '100%' }} variant="standard" multiline rows={3} placeholder="Edit duty" name="duty" onChange={onChange} defaultValue={duty} />
                <Button variant="contained" sx={{ backgroundColor: "green" }} onClick={handleSubmit}>Submit Change</Button>
                <Button variant="contained"
                    sx={{
                        backgroundColor: "red", '&:hover': {
                            backgroundColor: 'white',
                            borderColor: 'red',
                            boxShadow: '3px 3px red, -1em 0 .4em olive',
                        }
                    }}
                    onClick={handleClose}>
                    Close
                </Button>
            </Modal>
        )
    }

    return (
        <div>
            {addTeam()}
            <Button
                variant="contained"
                sx={{
                    '&:hover': {
                        backgroundColor: 'white',
                    }
                }}
                onClick={handleOpen}>
                Add Resource team
            </Button>

            <Paper>
                {!!props.resourceteam.length && props.resourceteam.map((data, i) =>
                    <div key={i} >
                        {editTeam(data)}
                        <div style={{ paddingLeft: "1em", paddingTop: "1em" }}>
                            <img
                                loading="lazy"
                                src={data.photo}
                            />
                            <div >
                                <p>{data.name}</p>
                                <p>{data.role}</p>
                                <p>{data.duty}</p>
                                {props.isAuthenticated && <DeleteItem remove={deleteResourceTeam} id={data._id} />}
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


ResourceTeam.propTypes = {
    getResourceTeam: PropTypes.func,
    addResourceTeam: PropTypes.func,
    clearErrors: PropTypes.func,
    resourceteam: PropTypes.array
};

const mapStateToProps = state => ({
    resourceteam: state.resourceteam.resourceteam,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getResourceTeam, addResourceTeam, clearErrors, editResourceTeam, deleteResourceTeam })(ResourceTeam);
