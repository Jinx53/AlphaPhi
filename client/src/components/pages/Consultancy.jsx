import React, { useState, useEffect, useRef } from "react";
import '../../styles/Services.css';
import '../../styles/WStyles.css';
import '../../styles/Home.css';
import '../../styles/About.css';
import '../../styles/Shared.css';
import background from "../../images/consultation-services.jpg";
import background500 from "../../images/consultation-services-p-500.jpg";
import background800 from "../../images/consultation-services-p-800.jpg";
import Service from '../common/Service';


const ITEMS = [
];


export const Consultancy = () => {
    const message = useRef(null);

    useEffect(()=>{
        document.title = 'Consultancy service';
    }, []);

    const procurementItems = [
    ]

    return (
        <>
            <Service
            gallery_title={"consultancy success stories"}
            contact_description={"Book a consultation"}
            SERVICE={procurementItems}
            modal_title={""}
            ITEMS={ITEMS} 
            service_title={"Consultancy services"}
            service_body={"We offer consultations on various services like fabricate, construct of parts and components from engineering drawing or specifications. Our technicians are trained is drilling, welding, grinding, casting and other processes which enables them to offer best industry standards consultation."}
            background={background} 
            background500={background500} 
            background800={background800}
            />
        </>
    );
}

export default Consultancy