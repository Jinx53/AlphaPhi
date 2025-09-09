import React, { useState, useEffect, useRef } from "react";
import '../../styles/Services.css';
import '../../styles/WStyles.css';
import '../../styles/Home.css';
import '../../styles/About.css';
import '../../styles/Shared.css';
import background from "../../images/rental-services.png";
import Service from "../common/Service";

const ITEMS = [];
export const Rentals = () => {
    const message = useRef(null);

    useEffect(() => {
        document.title = 'Rentals & leasing service';
    }, []);

    const retalItems = [
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
                gallery_title={"retal success stories"}
                contact_description={"Request equipment for lease/rent"}
                SERVICE={retalItems}
                modal_title={""}
                ITEMS={ITEMS}
                service_title={"Equipment leasing and rental services"}
                service_body={"We have various equipment which can be leased our rented.  We understand the hassel of buying most of this equipment outright and we wish to make the process easy for a lot of our customers/clients. Reach out for more information as we have terms and conditions which applies to this service."}
                background={background}
                background500={background}
                background800={background}
            />
        </>
    );
}

export default Rentals