import React, { useRef, useEffect, useState } from 'react'
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Tools.css';
import '../../styles/Services.css';
import '../../styles/Home.css';
import '../../styles/About.css';
import TrustedFirms from './TrustedFirms';
import Testimonial from "./Testimonial";
import ArrowButton from "./ArrowButton";
import PlayButton from "./PlayButton";
import Contact from "./Contact";
import { standard_compliant } from './consts/otherLogos';
import Modal from "./Modal";
import Carousel from "./Carousel";

const Service = ({ gallery_title, contact_description, SERVICE, modal_title, ITEMS, service_title, service_body, background, background500, background800 }) => {


    const message = useRef(null);
    const autoScroll = () => message.current.scrollIntoView({ behavior: "smooth" });

    const [open, setOpen] = useState(false);
    const handleModal = () => {
        setOpen(!open);
    }

    const notFound = (<div>No item found.</div>);

    const VIEW = (item) => (
        <div>
            <img src={item.image} loading="lazy" alt="" />
        </div>
    )

    const viewSlide = () => (
        <Modal
            open={open}
            textColor={"black"}
            title={modal_title}
            onClose={handleModal}
        >
            <Carousel
                ITEMS={ITEMS}
                VIEW={VIEW} />
        </Modal>
    );

    return (

        <>
            <section className="section short bg-dark-25">
                <img src={background} loading="lazy" sizes="100vw" srcSet={`${background500} 500w, ${background800} 800w, ${background} 987w`} alt="" className="service-bg" />
                <div className="bg-training-service mt-20">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="grid-x2-l">
                            <div id="w-node-_55db6e44-f79a-d1d3-2cbf-6f285e67c869-eeaa1ab7">
                                <div className="service-content-container">
                                    <div>
                                        <h1 className="display-2 color-primary">{service_title}</h1>
                                        <div className="hr hr-bar bg-primary"></div>
                                        <p className="p my-10">{service_body}</p>
                                        <ArrowButton title="Redirect to request service" className="button outline color-primary w-inline-block" onClick={autoScroll}>
                                            Book now
                                        </ArrowButton>
                                    </div>
                                </div>
                            </div>
                            <div id="w-node-_85362ddc-aed4-153b-8050-38fe598e45f7-eeaa1ab7"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section short bg-dark-25">
                <div className="w-layout-blockcontainer container wide w-container">
                    <div className="flex-v center text-center">
                        <h2>Gallery - {gallery_title}</h2>
                        <div className="hr hr-bar"></div>
                    </div>
                    {viewSlide()}
                    <div className="mb-20">
                        <div className="w-dyn-list">
                            <div role="list" className="w-dyn-items">
                                {!!SERVICE?.length ? SERVICE.map((item, i) => (
                                    <div key={i} role="listitem" className="gallery-item w-dyn-item">
                                        <img src={item.photo} loading="lazy" alt="" className="gallery-img fabrication-img" />
                                        <div className="gallery-item-content fabrication-content">
                                            <h4>{item.title}</h4>
                                            <div className="color-primary-15 my-02">{item.location}</div>
                                            <div className="my-02 w-richtext">{item.description}</div>
                                            <PlayButton onClick={handleModal} className="button outline color-primary my-02 w-inline-block">
                                                View slideshow
                                            </PlayButton>
                                        </div>
                                    </div>
                                )) : notFound
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Testimonial />
            <TrustedFirms
                description={"We are standard compliant"}
                logo_img={standard_compliant}
            />
            <section className="section short bg-home-about">
                <div className="w-layout-blockcontainer container w-container">
                    <div ref={message} className="grid-x2-l fr-3-2 p-20">
                        <Contact description={contact_description}
                            useServices={true}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Service;