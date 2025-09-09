import React, { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from '@mui/material';
import DeleteItem from "../common/DeleteItem";
import { useSelector, useDispatch } from 'react-redux';
import { getSubscriber, addSubscriber, deleteSubscriber, editSubscriber } from "../../actions/SubscriberAction";
import { clearErrors } from "../../actions/ErrorAction";
import useErrorMessage from "../common/useErrorHook";

export const Subscribers = () => {
    const dispatch = useDispatch();
    const { subscribers } = useSelector(state => state.subscriber);
    const { isAuthenticated } = useSelector(state => state.auth);
    const errorMessage = useErrorMessage("ADD_SUBSCRIBER");

    useEffect(() => {
        document.title = 'Subscribers';
        dispatch(getSubscriber());
    }, []);

    let clearSubscriber = () => {
        dispatch(clearErrors());
    }

    const theme = useTheme();

    const phoneStyle = useMediaQuery(theme.breakpoints.down('laptop'));

    return (
        <>
            <h2>Subscribers</h2>
            {!!subscribers.length && subscribers.map((data, i) =>
                <ul key={i}>
                    <li>{data.email}</li>
                    {isAuthenticated && <DeleteItem remove={deleteSubscriber} id={data._id} />}
                </ul>
            )}
        </>
    );
}

export default Subscribers