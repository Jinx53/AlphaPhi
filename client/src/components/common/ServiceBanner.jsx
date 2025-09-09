import React, { useRef, useState } from 'react';
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Services.css';
import { useNavigate, Link } from "react-router-dom";
import ArrowButton from './ArrowButton';
import LinkButton from './LinkButton';

const ServiceBanner = ({ title, links, service_tiles, show_discover_more, discover_more_link }) => {

    const navigate = useNavigate();

    const handleClick = (item = {}) => {
        navigate(item.route, { state: { route: item.route, index: item.index } });
    }

    const serviceLink1 = links[0] || [];
    const serviceLink2 = links[1] || [];

    return (
        <>
            <section className="section short bg-home-services">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="grid-x2-l fr-3-2 padding-y-20">
                        <div id="w-node-_9b443ead-a3e1-1d22-88d1-1ffe46daa94f-8160a9e8">
                            <h2>{title}</h2>
                            <div className="hr service-banner"></div>
                            <p>We are committed to providing world-class services to support the petro-chemical and mechanical industry by providing them specialized equipment and tools for rent and the most affordable prices. Our services include:</p>
                            <div className="gap-0 div-block div-block-2 div-block-3 div-block-4 div-block-5 div-block-6 div-block-7 div-block-8 div-block-9">
                                <ul className="grid-x2-l w-list-unstyled">
                                    {!!serviceLink1.length && serviceLink1.map((service, index) =>
                                        <li key={index} className="link-item">
                                            <LinkButton className="text-link w-inline-block" onClick={() => handleClick({ route: `../${service.route}`, index: service.index })}>
                                                {service.link_name}
                                            </LinkButton>
                                        </li>
                                    )}
                                </ul>
                                <ul className="grid-x2-l  w-list-unstyled">
                                    {!!serviceLink2.length && serviceLink2.map((service, index) =>
                                        <li key={index} className="link-item">
                                            <LinkButton className="text-link w-inline-block" onClick={() => handleClick({ route: `../${service.route}`, index: service.index })}>
                                                {service.link_name}
                                            </LinkButton>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            {show_discover_more &&
                                <div className="mt-10">
                                    <ArrowButton className="button outline w-inline-block" onClick={() => handleClick({ route: `../${discover_more_link.route}`, index: discover_more_link.index })}>
                                        Discover more
                                    </ArrowButton>
                                </div>
                            }
                        </div>
                        <div id="w-node-d4f2bf69-f9b5-f97f-06df-9f02745c9174-8160a9e8" className="align-y-center-m">
                            <div className='mx-auto grid-x2-l'>
                                {!!service_tiles?.length && service_tiles.map((service_tile, index) =>
                                    <Link key={index} className="display-button w-inline-block service-banner" to={`../${service_tile.route}`} state={{ route: service_tile.route, index: service_tile.index }}>
                                        <img src={service_tile.icon} loading="lazy" alt="" />
                                        <div className="notation-heading">{service_tile?.link_name}</div>
                                        <p className="mt-10">{service_tile.description}</p>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServiceBanner;