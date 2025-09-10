import React, { useRef, useEffect, useState } from 'react'
import '../../styles/Shared.css';
import '../../styles/Contact.css';
import '../../styles/WStyles.css';
import { Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useDispatch, useSelector } from "react-redux";
import { addEnquire, getContactUs } from "../../actions/ContactAction";
import PropTypes from 'prop-types';


const Contact = ({ description, option, onSubmit, hideEmail, hidePhone, message, useServices }) => {
    const emailRef = useRef();
    const subjectRef = useRef();
    const messageRef = useRef();
    const nameRef = useRef();
    const startDateRef = useRef();
    const selectionRef = useRef();
    const otherRef = useRef();

    const [otherSelected, setOther] = useState(false);
    const [contactFailed, onContactFailed] = useState(false);
    const [contactSuccess, onContactSuccess] = useState(false);
    const dispatch = useDispatch();
    const { activeContact } = useSelector(state => state.contactus);
    const defaultEmail = "test@test.com";
    const defaultPhone = "+351912345678";
    const defaultBody = useServices ? 'We are committed to providing world-class services to support the petro-chemical and mechanical industry by providing them specialized equipment and tools for rent and the most affordable prices. Our services include:' : 'We would love to get your feedback about our products and services. If you have enquiries or need help with any of our services please leave a message. We are here to answer you promptly.';
    const { body, address, phone, email } = activeContact || {};

    useEffect(() => {
        dispatch(getContactUs());
    }, []);

    let checkError = (onError) => {
        onContactFailed(onError);
        onContactSuccess(!onError);
    }

    let clearError = () => {
        emailRef.current.value = null;
        subjectRef.current = null;
        messageRef.current = null;
        nameRef.current = null;
        startDateRef.current = null;
        selectionRef.current = null;
        otherRef.current = null;
        setOther(false);
    }

    let handleSelect = (e) => {
        const value = e.target.value;
        if (value === "other") setOther(true);
        else setOther(false);
    }

    let OnSubmit = (e) => {
        e.preventDefault();
        let [isValid, contact] = validateContact();
        if (isValid) sendContact(contact);
    }

    const validateContact = () => {
        const emailpattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
        const checkPattern = (pattern, value) => new RegExp(pattern).test(value)
        const email = emailRef.current.value;
        const subject = subjectRef?.current?.value;
        const message = messageRef.current.value;
        const name = nameRef?.current?.value ?? "";
        const startDate = startDateRef?.current?.value ?? "";
        const selection = selectionRef?.current?.value ?? "";
        const other = otherRef?.current?.value || "";
        let validEmail = checkPattern(emailpattern, email);
        let validText = message.trim().length;
        let validName = name.trim().length;
        let validother = (selection === 'other' && other.trim().length) ? true : (selection !== 'other' && selection.length) ? true : false;

        let isValid = useServices ? (validText && validEmail && validName && validother) : (validText && validEmail);
        if (isValid) {
            const contactus = { name, email, subject, message, startDate, selection, other, description };
            clearError()
            checkError(false);
            return [true, contactus];
        } else {
            checkError(true);
            return [false]
        }
    }

    let sendContact = (contactus) => {
        console.log("the contact: ", contactus);
        if (Array.isArray(option) && (option || []).length)
            dispatch(onSubmit(contactus, option));
        else dispatch(addEnquire(contactus));
    }

    const contactFields = () => {
        return (
            <>
                <label htmlFor="email-3" className="d-none">Email Address</label>
                <input type="email" className="form-input my-02 w-input" maxLength="256" name="email-3" placeholder="*Enter your email" id="email-3" required="" ref={emailRef} />
                <label htmlFor="subject" className="d-none">Subject</label>
                <input type="text" className="form-input my-02 w-input" maxLength="256" name="subject" placeholder="Enter a subject" id="subject" ref={subjectRef} />
                <textarea required="" placeholder="*Leave us a message" maxLength="5000" id="message" name="message" className="text-area-l form-input my-02 w-input" ref={messageRef}></textarea>
                <button className="button _w-100 my-02 w-button" onClick={OnSubmit}>Submit</button>
            </>
        )
    }

    const servicesFields = () => {
        return (
            <>
                <div className="grid-x2-l">
                    <label htmlFor="name" className="d-none">Full name (surname last)</label>
                    <input type="text" className="w-input" maxLength="256" name="name" placeholder="Enter your full name (*)" id="name" ref={nameRef} />
                    <label htmlFor="Email-4" className="d-none">Email Address</label>
                    <input type="email" className="w-input" maxLength="256" name="Email" placeholder="Enter your email (*)" id="Email-4" required="" ref={emailRef} />
                </div>
                <input type="text" className="w-input" maxLength="256" name="Subject" placeholder="Enter a subject" id="Subject" required="" ref={subjectRef} />
                <div className="grid-x2-l">
                    <input type="date" className="w-input" maxLength="256" name="Start-date" placeholder="Enter a start date" id="Start-date" ref={startDateRef} />
                    <select id="Duration" name="Duration" className="w-select" ref={selectionRef} onChange={handleSelect}>
                        {[{ value: "", name: "Select one..." }, { value: "3 months", name: "3 months" }, { value: "6 months", name: "6 months" }, { value: "other", name: "Other" }].map((list, i) => (

                            <option key={i} value={list.value} >{list.name}</option>
                        )
                        )}
                    </select>
                </div>
                {(otherSelected) && <input type="text" className="w-input" maxLength="256" name="other" placeholder="Enter duration (*)" id="Other" required="" ref={otherRef} />}
                <textarea id="Message" name="Message" maxLength="5000" data-name="Message" placeholder="Leave us a message (*)" required="" className="w-input" ref={messageRef}></textarea>
                <button className="button _w-100 my-02 w-button" onClick={OnSubmit}>Submit</button>
            </>
        )
    }

    return (

        <>
            <div id="w-node-_209954c1-c2c8-499b-3009-4d34437154e2-e7cbe410">
                <h2>{description}</h2>
                <div className="hr hr-bar"></div>
                <p className="p">{!!message?.length ? message : `${(body || defaultBody)}`}</p>
                <p className="p">{!!address?.length && `${address}`}</p>
                <ul className="grid-x2-l my-10 w-list-unstyled">
                    {!hideEmail && <li className="link-item">
                        <Link
                            href={`mailto:${email || defaultEmail}`}
                            className="text-link w-inline-block"
                            underline="none"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                        >
                            <EmailIcon sx={{ mr: 4 }} />
                            Contact us via email
                        </Link>
                    </li>}
                    {!hidePhone && <li className="link-item">
                        <Link
                            className="text-link w-inline-block"
                            underline="none"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            href={`tel:${phone || defaultPhone}`}
                        >
                            <PhoneIcon sx={{ mr: 4 }} />
                            Contact us via phone
                        </Link>
                    </li>}
                </ul>
            </div>
            <div id="w-node-_209954c1-c2c8-499b-3009-4d34437154ea-e7cbe410">
                <div className="w-form">
                    {!contactSuccess && (
                        useServices ? servicesFields() : contactFields()
                    )}
                    {contactSuccess && (
                        <div className={contactSuccess ? "w-form-done-view" : "w-form-done"}>
                            <div>Thank you! Your submission has been received!</div>
                        </div>
                    )}
                    {contactFailed && (
                        <div className={contactFailed ? "w-form-fail-view" : "w-form-fail"}>
                            <div>Oops! Something went wrong while submitting the form. Make sure mandatory(*) fields are filled</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


Contact.propTypes = {
    getContactUs: PropTypes.func,
    addContactUs: PropTypes.func,
    addEnquire: PropTypes.func,
    contactus: PropTypes.array
};


export default Contact;