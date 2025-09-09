import React, { useEffect, useRef, useState } from 'react'
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Services.css';
import { useNavigate } from "react-router-dom";
import separator from "../../images/separator.svg";
import Lottie from "lottie-react";
import { ServiceItems } from './consts/serviceItems';
import ArrowButton from './ArrowButton';

const Services = ({ unscrollable }) => {

    const navigate = useNavigate();
    const handleClick = (item) => {
        let route = unscrollable ? `../${item.route}` : item.route;
        navigate(route, { state: { route: route, index: item.index } });
    }


    const RHS_Description = (service) => {
        return (
            <>
                <div id="w-node-dc69c7c0-278d-5aa1-1aac-2bb209ed85b1-8160a9e8" className="hug-right">
                    <h3 className="service-heading">{service.title}</h3>
                    <div className="text-large">{service.subtitle}</div>
                    <p className="p my-10">{service.body}</p>

                    <ArrowButton className="button primary-outline w-inline-block" onClick={() => handleClick(service)}>
                        {service.button_description}
                    </ArrowButton>
                </div>
                <div id="w-node-_6cb73de6-63ec-c3f2-08ad-a1c984619514-8160a9e8" className="hug-left">
                    <Lottie animationData={service.animate_image} autoplay={true} loop={1}  />
                </div>
            </>
        )
    }

    const LHS_Description = (service) => {
        return (
            <>
                <div id="w-node-_6cb73de6-63ec-c3f2-08ad-a1c984619514-8160a9e8" className="hug-right">
                    <Lottie animationData={service.animate_image} autoplay={true} loop={1} />
                </div>
                <div id="w-node-dc69c7c0-278d-5aa1-1aac-2bb209ed85b1-8160a9e8" className="hug-left">
                    <h3 className="service-heading">{service.title}</h3>
                    <div className="text-large">{service.subtitle}</div>
                    <p className="p my-10">{service.body}</p>

                    <ArrowButton className="button primary-outline w-inline-block" onClick={() => handleClick(service)}>
                        {service.button_description}
                    </ArrowButton>
                </div>
            </>
        )
    }

    return (
        <section className="section short">
            <div className="w-layout-blockcontainer w-container">
                <div className="text-center">
                    <h2>Book a service</h2><img src={separator} loading="lazy" alt="" />
                </div>
                <div className={unscrollable ? " " : "service-layout-wrapper"}>
                    {ServiceItems.map((service, i) => {
                        const styleOrder = (i % 2) ? "service-layout" : "service-layout reversed";

                        const services = (i % 2) ? LHS_Description(service) : RHS_Description(service);

                        return (<div key={i} className={styleOrder}>
                            {services}
                        </div>)
                    })}
                </div>
            </div>
        </section>
    )
}

export default Services;