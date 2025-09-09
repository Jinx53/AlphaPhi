import React, { useRef, useEffect, useState } from 'react'
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Home.css';
import { useMediaQuery, useTheme } from '@mui/material';
import { HomeBanner } from './consts/advertItems';


const AdvertBanner = ({ showDescription }) => {

    const theme = useTheme();

    const phoneView = useMediaQuery(theme.breakpoints.down('laptop'));
    const itemStyle = `notation-item advert-banner ${phoneView ? 'first' : ''}`;
    const itemStyle2 = `notation-item flex-h advert-banner ${phoneView ? 'first' : ''}`;
    const bannerStyle = showDescription ? itemStyle : itemStyle2;

    return (
        <div className="notation-wrapper">
            <div className="grid-x3-l">
                {HomeBanner.map(item => {
                    const itemStyles = (item.index) ? bannerStyle : `notation-item first advert-banner ${showDescription ? "" : "flex-h"}`;
                    let servicethumb = showDescription ? 
                    ( <div className="d-inline gap-10 mb-10">
                        <img src={item.icon} loading="lazy" alt="" className="mr-05" />
                        <div className="notation-heading"><span className="color-primary-15">{item.top_header}</span>{item.bottom_header}</div>
                    </div>) : 
                    (<>
                        <img src={item.icon} loading="lazy" alt="" className="mr-05" />
                        <div className="notation-heading"><span className="color-primary-15">{item.top_header}</span>{item.bottom_header}</div>
                    </>)
                    return (
                        <div key={item.index} id="w-node-e1e1c422-a8a1-7229-dcb8-b58ec1e71124-8160a9e8" className={itemStyles}>
                            {servicethumb}
                            {showDescription && (<p className="p">{item.description}</p>)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdvertBanner;