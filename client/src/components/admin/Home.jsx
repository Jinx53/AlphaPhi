import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import '../../styles/Home.css';
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Tools.css';
import Search from "../common/Search";
import Banner from "../common/Banner";
import ToolList from "../common/ToolList";
import AdvertBanner from "../common/AdvertBanner";
import Services from "../common/Services";
import ServiceBanner from "../common/ServiceBanner";
import TrustedFirms from "../common/TrustedFirms";
import separator from "../../images/separator.svg";
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery, useTheme, Button } from '@mui/material';
import { serviceLink1, serviceLink2, serviceLink3 } from '../common/consts/serviceItems';
import { useSelector, useDispatch } from 'react-redux';
import { getTools } from "../../actions/ToolsAction";
import { top_firms } from '../common/consts/otherLogos';
import ArrowButton from '../common/ArrowButton';

export default function Home() {
    const dispatch = useDispatch();
    const { tools } = useSelector(state => state.toolsState);
    const [toolList, setTools] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        document.title = 'Alpha-Phi Measurements';
        dispatch(getTools());
    }, []);
    
     useEffect(() => {
        setTools(tools)
    }, [tools]);


    const handleClick = (item) => {
        navigate(item.route, { state: { route: item.route, index: item.index } });
    }

    const phoneView = useMediaQuery(theme.breakpoints.down('laptop'));

    return (
        <div>
            <section className="section bg-home1">
                <div className="w-layout-blockcontainer container first w-container">
                    <div className="home-content">
                        <div className="grid-x2-l">
                            <div id="w-node-fce4d5f5-6075-30a6-c7e9-60065c8c96fb-8160a9e8">
                                <h1 className="heading">
                                    <span className="home-title" >We provide world-</span>
                                    <br />‍<span className="home-title" >class solutions for </span>
                                    <span className="display-1 home-title">
                                        <br />pipeline calibration
                                    </span>
                                </h1>
                            </div>
                            <div id="w-node-_77272ed7-5087-23e7-9448-32553b09f900-8160a9e8"></div>
                        </div>
                    </div>
                </div>
                <div className="stick-bottom bg-dark">
                    <div className="grid-x2-l gap-0">
                        <div id="w-node-b7d55ded-9618-18ee-4ddd-ac0d4cfb35eb-8160a9e8" className="p-20 align-y-center-m just-right-m">
                            <div id="w-node-_954fdbfe-49da-5529-565e-eaf9251812eb-8160a9e8" className="text-large margin-r-10">Need a calibration tool?</div>
                        </div>
                        <div id="w-node-_8f000782-4b84-95e3-fb66-ebf08e945717-8160a9e8" className="p-20 bg-primary">
                            <div className="max-w-20">
                                <Search
                                    items={toolList}
                                    setItems={setTools}
                                    reload={getTools}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Banner />

            <section className="section">
                <div className="w-layout-blockcontainer container my-20 w-container">
                    <div className="text-center">
                        <h2>Discover tools for rent</h2><img src={separator} loading="lazy" alt="" />
                    </div>
                    <div className="my-10" onClick={() => handleClick({ route: "tools", index: "0" })}>
                        <ToolList
                            tools={toolList}
                            maxLimit={8}
                        />
                    </div>
                    <div className="text-center">
                        <ArrowButton className="button primary-outline w-inline-block" onClick={() => handleClick({ route: "tools", index: "0" })}>
                            Explore more tools
                        </ArrowButton>
                    </div>
                </div>
            </section>

            <ServiceBanner
                title={"Our Services"}
                links={[serviceLink1, serviceLink2]}
                service_tiles={serviceLink3}
                show_discover_more={true}
                discover_more_link={{ route: "services", index: 1 }}
            />

            <Services />

            <section className="section short bg-dirty">
                <div className="w-layout-blockcontainer w-container">
                    <div className="text-center my-10">
                        <h2>Why choose α-Phi?</h2>
                    </div>
                    <AdvertBanner showDescription={true} />
                </div>
            </section>


            
            <TrustedFirms  
                description={"Trusted by top firms"}
                logo_img={top_firms}
            />

            <section className="section short bg-home-about">
                <div className="w-layout-blockcontainer w-container">
                    <div className="home-about-content">
                        <h2>About Us</h2><img src={separator} loading="lazy" alt="" />
                        <p className="my-10">Alpha-Phi Measurements Limited is an indigenous company with the aim to render professional calibration services to the petroleum industry of the sub Sahara region. Our operation standards and procedures are well within the confines of the DPR, API, MPMS, GPSA, ISO, NIPEX amongst others.</p>
                        <div onClick={() => handleClick({ route: "about", index: "2" })} className="button outline w-inline-block">
                            <>Learn more</>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
