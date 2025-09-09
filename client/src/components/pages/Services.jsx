import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import "../../styles/Shared.css";
import "../../styles/WStyles.css";
import "../../styles/Services.css";
import Contact from "../common/Contact";
import TrustedFirms from "../common/TrustedFirms";
import Testimonial from "../common/Testimonial";
import ServicesList from "../common/Services";
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from "../../actions/ServiceAction";

import { top_firms } from '../common/consts/otherLogos';


export const Services = () => {
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services);

    useEffect(() => {
        document.title = 'Services';
        dispatch(getServices());
    }, []);


    return (
        <>
            <section className="section short bg-services">
                <div className="w-layout-blockcontainer container first w-container">
                    <div className="home-content">
                        <div className="grid-x2-l">
                            <div id="w-node-_209954c1-c2c8-499b-3009-4d34437154e2-e5468d47">
                                <h1 className="service-title"><span>We provide services for<br />‍</span><span>engineering hydraulic</span> <br />‍<span>works</span></h1>
                            </div>
                            <div id="w-node-_209954c1-c2c8-499b-3009-4d34437154ea-e5468d47"></div>
                        </div>
                    </div>
                </div>
            </section>
            <ServicesList unscrollable={true} />
           
            <Testimonial />

            <TrustedFirms  
                description={"Trusted by top firms"}
                logo_img={top_firms}
            />
            <section className="section short bg-home-services">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="grid-x2-l fr-3-2 p-20">
                        <Contact description={"Contact us"} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Services;
