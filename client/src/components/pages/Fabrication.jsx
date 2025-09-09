import React, { useState, useEffect, useRef } from "react";
import '../../styles/Services.css';
import '../../styles/WStyles.css';
import '../../styles/Home.css';
import '../../styles/About.css';
import '../../styles/Shared.css';
import background from "../../images/fabrication-services.jpg";
import background500 from "../../images/fabrication-services-p-500.jpg";
import background800 from "../../images/fabrication-services-p-800.jpg";
import biogas_digester from "../../images/biogas_digester.jpeg";
import slurry_machine from "../../images/slurry-machine.jpeg";
import pulse_counter_ppc from "../../images/pulse-counter-ppc.jpeg";
import Service from "../common/Service";

const ITEMS = [];

export const Fabrication = () => {
    useEffect(()=>{
        document.title = 'Fabrication service';
    }, []);

    const fabricationItems = [
        {
            photo: biogas_digester,
            title: "Construction and fabrication of a biogas digester",
            location: "Boskel Nigeria plc, Port Harcourt",
            description: "The construction and fabrication of a biogas disgester was done following the engineering design provided.",
        },
        {
            photo: slurry_machine,
            title: "Fabrication and construction of slurry machine",
            location: "Boskel Nigeria plc, Port Harcourt",
            description: "The construction and fabrication of a biogas disgester was done following the engineering design provided.",
        },
        {
            photo: pulse_counter_ppc,
            title: "Impedit Aut",
            location: "Boskel Nigeria plc, Port Harcourt",
            description: "The construction and fabrication of a biogas disgester was done following the engineering design provided.",
        }
    ]

    return (
        <>
            <Service
            gallery_title={"fabrication success stories"}
            contact_description={"Request fabrication services"}
            SERVICE={fabricationItems}
            modal_title={""}
            ITEMS={ITEMS} 
            service_title={"Component construction & fabrication services"}
            service_body={"We fabricate and construct parts and whole components from engineering drawing or specifications. Our technicians are trained is drilling, welding, grinding, casting and other fabrication processes."}
            background={background} 
            background500={background500} 
            background800={background800}
            />
        </>
    );
}

export default Fabrication