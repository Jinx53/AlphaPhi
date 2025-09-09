import React, { useState, useEffect } from "react";
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/404.css';
import '../../styles/Home.css';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animate_image from "../../documents/animation_llpk588a.json";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import background from "../../images/background.jpg";
import background500 from "../../images/background-p-500.jpg";
import background800 from "../../images/background-p-800.jpg";
import background1080 from "../../images/background-p-1080.jpg";
import background1600 from "../../images/background-p-1600.jpg";
import background2000 from "../../images/background-p-2000.jpg";

export const NotFound = () => {

    useEffect(()=>{
        document.title = '404';
    }, []);

    const navigate = useNavigate();

    const handleClick = (item = {}) => {
        navigate(item.route, { state: { route: item.route, index: item.index } });
    }

    return (
        <div>
            <section className="section color-white">
                <div className="w-layout-blockcontainer container p-0 w-container">
                    <div className="_404-content">
                        <div className="_404-gradient _3"></div>
                        <Lottie animationData={animate_image} autoplay={true} style={{}} />

                        <h1 className="display-1">Page not found!</h1>
                        <div className="my-10">It seems you&#x27;ve taken a wrong turn. Let&#x27;s help you get back on track.</div>
                        <div className="button outline w-inline-block">
                            <Button onClick={() => handleClick({ route: `/`, index: -1 })} className="ml-10 text-icon" startIcon={<ArrowRightAltIcon />}>
                                Go back home
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="_404-bg">
                    <div className="div-block-10">
                        <div className="div-block-11">
                            <div className="div-block-12"></div>
                            <div className="grid-x3-l">
                                <a id="w-node-_1957c615-8656-056b-a704-a863cd9ed2c7-47fb3877" href="tools.html" className="w-inline-block"></a>
                            </div><img src={background} loading="lazy" sizes="(max-width: 767px) 100vw, 64vw" srcSet={`${background500} 500w, ${background800} 800w, ${background1080} 1080w, ${background1600} 1600w, ${background2000} 2000w, ${background} 2500w`} alt="" className="image" />
                        </div>
                    </div>
                    <div className="_404-gradient _1"></div>
                    <div className="_404-gradient"></div>
                </div>
            </section>
        </div>
    );
}

export default NotFound