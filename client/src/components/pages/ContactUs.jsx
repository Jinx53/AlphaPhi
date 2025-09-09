import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import { Button, Paper, Box, Input, TextField, Checkbox } from '@mui/material';
import "../../styles/WStyles.css";
import "../../styles/Shared.css";
import AdvertBanner from "../common/AdvertBanner";
import Contact from "../common/Contact";
import { useNavigate } from "react-router-dom";
import { serviceLink1, serviceLink2 } from "../common/consts/serviceItems";
import ArrowButton from "../common/ArrowButton";
import LinkButton from "../common/LinkButton";

const ContactUs = () => {

    useEffect(() => {
        document.title = 'Contact us';
    }, []);

    const navigate = useNavigate();

    const handleClick = (item = {}) => {
        navigate(item.route, { state: { route: item.route, index: item.index } });
    }

    return (
        <>
            <section className="section short bg-contact">
                <div className="w-layout-blockcontainer container first w-container">
                    <div className="my-50"></div>
                    <div className="home-content">
                        <div>
                            <div className="grid-x2-l">
                                <Contact description={"We're always at your service"} />
                            </div>
                            <AdvertBanner />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section short bg-dark">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="grid-x2-l my-20">
                        <div id="w-node-_3677e6ed-9b01-baee-004f-df1f634e158a-e7cbe410">
                            <h2>Why work with us?</h2>
                            <div className="hr hr-bar"></div>
                            <p className="p">We are committed to providing world-className services to support the petro-chemical and mechanical industry by providing them specialized equipment and tools for rent and the most affordable prices. Our services include:</p>
                            <div className="mt-10">
                                <ArrowButton className="button outline w-inline-block" onClick={() => handleClick({ route: "../services", index: "1" })}>
                                    Discover more
                                </ArrowButton>
                            </div>
                        </div>
                        <div id="w-node-_3677e6ed-9b01-baee-004f-df1f634e15af-e7cbe410" className="align-y-center-m">
                            <div>
                                <ul role="list" className="my-10 w-list-unstyled-np">
                                    {
                                        [].concat(serviceLink1, serviceLink2).map((service, i) => (
                                            <li key={i} className="link-item">
                                                <LinkButton className="text-link w-inline-block" onClick={() => handleClick({ route: `../${service.route}`, index: service.index })}>
                                                    {service.link_name}
                                                </LinkButton>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default ContactUs;