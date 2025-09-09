import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import FormBox from "../common/FormBox";
import IDCard from "../common/IDCard";
import { useDispatch, useSelector } from 'react-redux';
import { getServices, addService, deleteService } from "../../actions/ServiceAction";
import { clearErrors } from "../../actions/ErrorAction";
import useErrorMessage from "../common/useErrorHook";

export const Services = () => {
    const [title, changeTitle] = useState("");
    const [body, changeBody] = useState("");
    const [footer, changeFooter] = useState("");
    const [photo, changePhoto] = useState({});
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const allServices = useSelector(state => state.services.services);
    const errorMessage = useErrorMessage("ADD_SERVICE");
    
    useEffect(() => {
        document.title = 'Services';
        dispatch(getServices());
    }, []);

    let onSubmit = (e) => {
        e.preventDefault();

        const service = { title, body, photo, footer};
        dispatch(addService(service));
        dispatch(clearErrors());
        changeTitle("");
        changeBody("");
        changePhoto("");
        changeFooter("");
        inputRef.current.value = null;
    }
    

    return ( 
    <div>
            <FormBox
            inputRef={inputRef}
            title={title}
            body={body}
            footer={footer}
            pageTitle={'Service'}
            errorMessage={errorMessage}
            changeTitle={changeTitle}
            changeBody={changeBody}
            changePhoto={changePhoto}
            changeFooter={changeFooter}
            onSubmit={onSubmit}
            />
            <IDCard
            allData={allServices}
            remove={deleteService}
            />
        </div>
    );
}

export default Services;
