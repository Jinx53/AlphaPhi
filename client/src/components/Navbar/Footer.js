import React, { useState, useEffect, Fragment } from "react";
import PropTypes from 'prop-types';
import { servicesList, helpList, legalList } from "./consts/footerListItems";
import Subscribe from '../common/Subscribe';
import logo from "../../images/a-Phi-Logo.svg";
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Footer.css';
import '../../styles/Header.css';

function a11yProps(item) {
    return {
        id: `alphapi-tab-${item.index}`,
        'aria-controls': `alphapi-tabpanel-${item.label}`,
    };
}

export const Footer = ({ changeLink }) => {
    return (
        <div>
            <section className="footer">
                <div className="w-layout-blockcontainer container w-container">
                    <a href="/" aria-current="page" className="brand-logo w-inline-block w--current">
                        <img src={logo} loading="lazy" alt="" className="brand-logo" />
                    </a>
                </div>
                <div className="w-layout-blockcontainer container w-container">
                    <div className="footer-grid my-10">
                        <div id="w-node-_49c59170-8f49-3837-e534-affdd5e36a9f-d5e36a99" className="mr-10">
                            <p className="my-10">Stay up-to-date with Alpha-Phi news and money saving discount opportunities. Subscribe to our newsletter now.</p>
                            <div className="w-form">
                                <Subscribe/>
                            </div>
                        </div>
                        <div id="w-node-_49c59170-8f49-3837-e534-affdd5e36aae-d5e36a99">
                            <div className="text-bold">Services</div>
                            <ul className="w-list-unstyled">
                                {servicesList.map((item) => (
                                    <li key={item.index} className="link-item">
                                        <a {...a11yProps(item)} onClick={() => changeLink(item)} className="text-link w-inline-block">
                                            <>{item.label}</>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div id="w-node-_49c59170-8f49-3837-e534-affdd5e36abe-d5e36a99">
                            <div className="text-bold">Help &amp; Support</div>
                            <ul className="w-list-unstyled">
                                {helpList.map((item) => (
                                    <li key={item.index} className="link-item">
                                        <a {...a11yProps(item)} onClick={() => changeLink(item)} className="text-link w-inline-block">
                                            <>{item.label}</>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div id="w-node-_49c59170-8f49-3837-e534-affdd5e36ace-d5e36a99">
                            <div className="text-bold">Legal</div>
                            <ul className="w-list-unstyled">
                                {legalList.map((item) => (
                                    <li key={item.index} className="link-item">
                                        <a {...a11yProps(item)} onClick={() => changeLink(item)} className="text-link w-inline-block">
                                            <>{item.label}</>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div>All rights reserved. copyright © 2023 Alpha-Phi Measurement Limited<br/><span><i>RC NO. 920779</i></span></div>
                    </div>
                </div>
            </section>
        </div>
    );

}

export default Footer;