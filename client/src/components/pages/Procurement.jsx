import React, { useState, useEffect, useRef } from "react";
import '../../styles/Services.css';
import '../../styles/WStyles.css';
import '../../styles/Home.css';
import '../../styles/About.css';
import '../../styles/Shared.css';
import background from "../../images/equipment-procurement-bg.png";
import background500 from "../../images/equipment-procurement-bg-p-500.png";
import background800 from "../../images/equipment-procurement-bg-p-800.png";
import Service from "../common/Service";

const ITEMS = [];

export const Procurement = () => {
    const message = useRef(null);

    useEffect(() => {
        document.title = 'Procurement service';
    }, []);

    const procurementItems = [
    ]

    const notFound = (<div className="w-dyn-empty">
        <div>No items found.</div>
    </div>);

    const scrollDown = () => {
        message.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            <Service
                gallery_title={"procurement success stories"}
                contact_description={"Request equipment procurement services"}
                SERVICE={procurementItems}
                modal_title={""}
                ITEMS={ITEMS}
                service_title={"Equipment procurement and delivery services"}
                service_body={"We maintain strong relationships with our suppliers across Europe and Asia to ensure that our services and fast and seamless thus, helping your business to keep running. Let’s get started."}
                background={background}
                background500={background500}
                background800={background800}
            />
        </>
    );
}

export default Procurement