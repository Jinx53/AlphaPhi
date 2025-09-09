import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import { Button, Paper, Box, Input, Modal, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, addUser, deleteUser, passwordChange, updateEmail, resetPassword } from "../../actions/UsersAction";
import { clearErrors } from "../../actions/ErrorAction";
import useErrorMessage from "../common/useErrorHook";
import DeleteItem from "../common/DeleteItem";
import PasswordInput from "../common/PasswordInput";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Users() {
    const fnameRef = useRef();
    const lnameRef = useRef();
    const [email, changeEmail] = useState("");
    const [password, changePassword] = useState("");
    const [currentpassword, changeCurrentpassword] = useState("");
    const [password2, changePassword2] = useState("");
    const dispatch = useDispatch();
    const { users, passwordChangeSuccessful, emailUpdateSuccessful } = useSelector(state => state.users);
    const currentuser = useSelector(state => state.auth.user);
    const errorMessage = useErrorMessage("REGISTER_FAIL");
    const passwordChangeError = useErrorMessage("CHANGE_PASSWORD");
    const emailUpdateError = useErrorMessage("UPDATE_EMAIL");
    const [error, setError] = useState("");
    const [openModel, setOpenModel] = useState(false);
    const [openEmailModel, setEmailModel] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        document.title = 'Users';
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        const message = !!passwordChangeError ? passwordChangeError : emailUpdateError;
        setError(message);
        if (passwordChangeSuccessful) {
            setOpenModel(!openModel);
            dispatch({ type: "PASSWORD_CHANGED" });
        }
        if (emailUpdateSuccessful) {
            setEmailModel(!openEmailModel);
            dispatch({ type: "EMAIL_UPDATED" });
        }
        if (passwordChangeSuccessful || emailUpdateSuccessful) {
            setUser({});
            setError("");
            dispatch(clearErrors());
        }
    }, [passwordChangeSuccessful, passwordChangeError, emailUpdateError, emailUpdateSuccessful]);

    let onChange = (e) => {
        if (e.target.name === "email") changeEmail(e.target.value);
        if (e.target.name === "password") changePassword(e.target.value);
        if (e.target.name === "password2") changePassword2(e.target.value);
        if (e.target.name === "currentpassword") changeCurrentpassword(e.target.value);
    }


    const checkPassword = (password1, password2) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,}$/;
        const checkPattern = (pattern, value) => new RegExp(pattern).test(value);
        if (!checkPattern(passwordPattern, password1)) {
            setError("The password does not meet the requirement of at least one lowercase letter, one uppercase letter, one digit, one special character, and is at least 8 characters long");
        } else if (password1 !== password2) setError("The password must be the same");
        else return true;

    }

    let onSubmit = (e) => {
        e.preventDefault();
        const fname = fnameRef.current.value
        const lname = lnameRef.current.value
        if (checkPassword(password, password2)) {
            const newuser = { fname, lname, email, password, password2 };
            dispatch(addUser(newuser))
            dispatch(clearErrors());
            fnameRef.current.value = null;
            lnameRef.current.value = null;
            changeEmail("");
            changePassword("");
            changePassword2("");
            setError("");
        }
    }

    const handlePasswordChange = (data) => {
        changePassword("");
        changePassword2("");
        setUser(data);
        setOpenModel(!openModel);
    }

    const onModalSubmit = () => {
        if (currentuser.email !== user.email) setError("The email isn't the same");
        else if (!!!currentpassword && !!!password && !!!password2) setError("All fields must be provided");
        else if (checkPassword(password, password2)) {
            const changepassworddata = { currentpassword, newpassword: password, password2, ...currentuser };
            dispatch(passwordChange(changepassworddata));
            changePassword("");
            changePassword2("");
            changeCurrentpassword("");
        }
    }

    const onCancel = (e) => {
        e.preventDefault();
        changePassword("");
        changePassword2("");
        changeCurrentpassword("");
        setError("");
        changeEmail("");
        setOpenModel(false);
        setEmailModel(false);
        setUser({});
        dispatch(clearErrors());
    }

    const onChangePassword = () => {
        return (
            <div>
                <Modal
                    open={openModel}
                    onClose={() => setOpenModel(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h2 >
                            Change user password
                        </h2>
                        <span style={{ color: 'red' }}>
                            {error}
                        </span>
                        <p>{user.fname} {user.lname}</p>
                        <p>{user.email}</p>
                        <PasswordInput type="password" placeholder="Enter current password" name="currentpassword" onChange={onChange} value={currentpassword} />
                        <PasswordInput type="password" placeholder="Enter new password" name="password" onChange={onChange} value={password} />
                        <PasswordInput type="password" placeholder="Re-enter new password" name="password2" onChange={onChange} value={password2} />
                        <Button variant="outlined" onClick={onModalSubmit} color="success">Save Change</Button>
                        <Button variant="outlined" onClick={onCancel} color="error">Cancel</Button>
                    </Box>

                </Modal>
            </div>
        )
    }

    const handleEmailChange = (data) => {
        changeEmail(data.email);
        setUser(data);
        setEmailModel(!openEmailModel);
    }

    const onEmailsubmit = (e) => {
        e.preventDefault()
        const _id = user._id
        if (!email) setError("enter an email:");
        else dispatch(updateEmail({ _id, email }))
    }

    const onChangeEmail = () => {
        return (
            <div>
                <Modal
                    open={openEmailModel}
                    onClose={() => setEmailModel(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h2 >
                            Change user email
                        </h2>
                        <h3>
                            {error}
                        </h3>
                        <Input type="email" placeholder="Enter user email" name="email" onChange={onChange} value={email} />
                        <Button variant="outlined" onClick={onEmailsubmit} color="success">Save Change</Button>
                        <Button variant="outlined" onClick={onCancel} color="error">Cancel</Button>
                    </Box>

                </Modal>
            </div>
        )
    }

    const handleResetPassword = (data) => {
        dispatch(resetPassword(data._id));
    }

    return (
        <div>
            User
            <Box
                component="form">
                <span style={{ color: 'red' }}>
                {error?.length ? error : errorMessage}
                </span>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Input type="text" placeholder="Enter user first name" name="fname" onChange={onChange} inputRef={fnameRef} />
                    </Grid>
                    <Grid item xs={5}>
                        <Input type="text" placeholder="Enter user last name" name="lname" onChange={onChange} inputRef={lnameRef} />
                    </Grid>
                    <Grid item xs={10}>
                        <Input type="email" placeholder="Enter user email" name="email" onChange={onChange} value={openEmailModel ? "" : email} />
                    </Grid>
                    <Grid item xs={10}>
                        <PasswordInput type="password" placeholder="Enter user password" name="password" onChange={onChange} value={!openModel ? password : ""} />
                    </Grid>
                    <Grid item xs={10}>
                        <PasswordInput type="password" placeholder="Enter password again for verification" name="password2" onChange={onChange} value={!openModel ? password2 : ""} />
                    </Grid>
                </Grid>
                <Button onClick={onSubmit}>Submit</Button>
            </Box>
            <div>{onChangePassword()}</div>
            <div>{onChangeEmail()}</div>
            <Paper>
                {users.length ? (users || []).map((data = {}, i, arr) =>
                    <div key={i} style={{ align: 'center' }}>
                        <div key={data?._id} style={{ paddingLeft: "1em", paddingTop: "1em" }}>
                            <p>{data?.fname} {data?.lname}</p>
                            <p>{data?.email}</p>
                            {users.length !== 1 && (currentuser.email !== data?.email) ? <DeleteItem remove={deleteUser} id={data?._id} /> : <Button variant="outlined" color="primary" onClick={() => handleEmailChange(data)} >Change email</Button>}

                            <Button variant="outlined" onClick={() => handlePasswordChange(data)} >Change password</Button>
                            <Button variant="outlined" onClick={() => handleResetPassword(data)} >Reset password</Button>

                        </div>
                        <br />
                    </div>)
                    : null}
            </Paper>

        </div>
    );
}