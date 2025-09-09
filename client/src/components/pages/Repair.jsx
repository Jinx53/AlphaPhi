import React, { useState, useEffect, useRef } from "react";
import '../../styles/Services.css';
import '../../styles/WStyles.css';
import '../../styles/Home.css';
import '../../styles/About.css';
import '../../styles/Shared.css';
import background from "../../images/repair-maintenance-services-bg.jpg";
import background500 from "../../images/repair-maintenance-services-bg-p-500.jpg";
import background800 from "../../images/repair-maintenance-services-bg-p-800.jpg";
import natural_gas_pipe from "../../images/natural-gas-pipe.jpeg";
import Service from "../common/Service";

const ITEMS = [];

export const Repair = () => {

    useEffect(() => {
        document.title = 'Repair & maintenance service';
    }, []);

    const repairItems = [
        {
            photo: natural_gas_pipe,
            title: "Repair of underground natural gas pipes",
            location: "Aqua Marine Oil and Gas",
            description: "Trace and restored a natural gas pipe that was broken causing shortage in output product.",
        },
        {
            photo: natural_gas_pipe,
            title: "Repair of pipes",
            location: "Aqua Marine & Land Pipe Line",
            description: "Trace and restored a natural gas pipe that was broken causing shortage in output product.",
        }
    ]

    return (
        <>
            <Service
            gallery_title={"repair success stories"}
            contact_description={"Book repair & maintenance services"}
            SERVICE={repairItems}
            modal_title={""}
            ITEMS={ITEMS} 
            service_title={"Get repair and maintenance services"}
            service_body={"We are committed to providing world-class repair and maintenance services to our clients. This means understanding the problem, time scope and critical nature of the project in other to be adequately prepared."}
            background={background} 
            background500={background500} 
            background800={background800}
            />
        </>
    );
}

export default Repair