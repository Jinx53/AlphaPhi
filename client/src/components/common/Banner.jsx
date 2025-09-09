import React, { } from 'react'
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Home.css';
import { useNavigate } from "react-router-dom";
import ArrowButton from './ArrowButton';

const Banner = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("tools", { state: { route: "tools", index: "0" } });
    }

    return (
        <section className="banner">
            <div className="w-layout-blockcontainer container w-container">
                <div className="max-w-20 my-10">
                    <h4 className="banner-title">Available tools</h4>
                    <p className="my-10">Rent tools to have your facilities up and running at a discount for a limited time.</p>
                    <ArrowButton onClick={handleClick} className="button outline w-inline-block">
                        Explore tools
                    </ArrowButton>
                </div>
            </div>
        </section>
    )
}

export default Banner;