import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUs } from '../../actions/AboutAction';
import { useNavigate } from "react-router-dom";
import TrustedFirms from '../common/TrustedFirms';
import ArrowButton from '../common/ArrowButton';
import LinkButton from '../common/LinkButton';
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/About.css';
import '../../styles/Home.css';
import aboutus from "../../images/01-about-us-bg.png";
import aboutus500 from "../../images/01-about-us-bg-p-500.png";
import aboutus800 from "../../images/01-about-us-bg-p-800.png";
import aboutimg from "../../images/about-floating-img.jpg";
import { HomeBanner } from '../../components/common/consts/advertItems';
import { standard_compliant, top_firms } from '../common/consts/otherLogos';
import { serviceLink1, serviceLink2 } from '../common/consts/serviceItems';
import ResourceTeam from "./ResourceTeam";
import Contact from "../common/Contact";


export const AboutUs = () => {
    const dispatch = useDispatch();
    const { aboutus } = useSelector(state => state.aboutus);

    useEffect(() => {
        document.title = 'About us';
    }, []);


    const navigate = useNavigate();

    const handleClick = (item = {}) => {
        navigate(item.route, { state: { route: item.route, index: item.index } });
    }


    useEffect(() => {
        dispatch(getAboutUs());
    }, []);

    return (
        <div>
            <section className="section short bg-dark-25">
                <div className="section short about"><img src={aboutus} loading="lazy" sizes="100vw" srcSet={`${aboutus500} 500w, ${aboutus800} 800w, ${aboutus} 950w`} alt="" className="service-bg about-img" />
                    <div className="bg-training-service mt-20">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="grid-x2-l">
                                <div id="w-node-_5a90a10e-e735-ccb1-a171-76d27b10edcb-01410dc0">
                                    <div className="service-content-container">
                                        <div>
                                            <h1 className="color-primary  mt-15">We always deliver<br /><span className="display-1">the best</span></h1>
                                            <div className="hr hr-bar bg-primary"></div>
                                            <p className="p my-10">Alpha-Phi Measurements Limited is a leading service provider in the petrochemical industry. We specialize in pipeline works, offering a wide range of services, such as repair and maintenance, consultancy, trainings, fabrication, equipment leasing and more.</p>
                                        </div>
                                    </div>
                                </div>
                                <div id="w-node-_5a90a10e-e735-ccb1-a171-76d27b10edd8-01410dc0"></div>
                            </div>

                            <div className="notation-wrapper floating max-w-l">
                                <div className="grid-x3-l">
                                    {
                                        HomeBanner.map(item => (
                                            <div key={item.index} id="w-node-eb3f64fe-e4c3-4e13-25e0-b0a3d067ddad-01410dc0" data-w-id="eb3f64fe-e4c3-4e13-25e0-b0a3d067ddad" className={`notation-item ${item.index ? "" : "first"} flex-h about-banner`}>
                                                <img src={item.icon} loading="lazy" alt="" className="mr-05" />
                                                <div>
                                                    <div className="notation-heading"><span className="color-primary-15">{item.top_header}</span>{item.bottom_header}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section bg-white">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="grid-x2-l pos-rel">
                            <div id="w-node-_36f3ddd2-70f2-3f9b-a1ff-d260b8a36eeb-01410dc0" className="about-floatin-img"><img src={aboutimg} loading="lazy" alt="" /></div>
                            <div id="w-node-bdc69d5b-6e0e-2ec3-13f4-047b1c0f0db8-01410dc0" className="my-20">
                                <div>
                                    <h2 className="color-primary">Building competence with each challenge</h2>
                                    <div className="hr hr-bar bg-primary"></div>
                                </div>
                                <p className="p my-10">We have acquired a strong experience from over 50+ year of active participation in this field. Our team of highly qualified and experienced professionals are committed to delivering world-className standard services to our customers. We use the latest technology and best practices to ensure safety, efficiency and excellence in our work.</p>
                                <p className="p">We are passionate about what we do and strive to exceed our customer&#x27;s expectations. At AlphaPhi, we measure our success by your satisfaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <TrustedFirms
                description={"We are standard compliant"}
                logo_img={standard_compliant}
            />

            <section className="section short bg-home-services">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="grid-x2-l fr-1-2 my-20">
                        <div id="w-node-_9d948dfd-0d2d-81a9-b6d2-aa3e6ef76779-01410dc0">
                            <h2>Why work with us?</h2>
                            <div className="hr hr-bar"></div>
                            <p className="p">We are committed to providing world-className services to support the petro-chemical and mechanical industry by providing them specialized equipment and tools for rent and the most affordable prices. Our services include:</p>
                            <ul role="list" className="my-10 w-list-unstyled">
                                {!!serviceLink1.length && [...serviceLink1, ...serviceLink2].map((service, index) =>
                                    <li key={index} className="link-item">
                                        <LinkButton className="text-link w-inline-block" onClick={() => handleClick({ route: `../${service.route}`, index: service.index })}>
                                            {service.link_name}
                                        </LinkButton>
                                    </li>
                                )}
                            </ul>
                            <div className="mt-10">
                                <ArrowButton className="button outline w-inline-block" onClick={() => handleClick({ route: `../services`, index: "1" })}>
                                    Discover more
                                </ArrowButton>
                            </div>
                        </div>
                        <div id="w-node-_9d948dfd-0d2d-81a9-b6d2-aa3e6ef767a0-01410dc0" className="align-y-center-m">
                            {HomeBanner.map((item) =>
                                <div key={item.index}>
                                    <div className="display-button service-banner"><img src={item.icon} loading="lazy" alt="" />
                                        <div className="notation-heading"><span className="color-primary-15">{item.top_header}</span>{item.bottom_header}</div>
                                        <p className="mt-10">{item.description}</p>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
            </section>

            <TrustedFirms
                description={"Trusted by top firms"}
                logo_img={top_firms}
            />
            <ResourceTeam />

            <section className="section short bg-home-about">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="grid-x2-l fr-3-2 p-20">
                        <Contact description={"Talk to us"} />
                    </div>
                </div>
            </section>


        </div>
    );
}

AboutUs.propTypes = {
    getAboutUs: PropTypes.func,
    aboutus: PropTypes.array
};

export default AboutUs;