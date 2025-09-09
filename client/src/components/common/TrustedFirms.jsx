import React, { useRef, useState } from 'react';
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Home.css';

const TrustedFirms = ({ logo_img, description }) => {
    return (
        <>
            <section className="section short">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="w-layout-grid grid-x2-l gap-0 fr-2-3 padding-y-10">
                        <div id="w-node-badd42ce-38e0-db74-073a-de1ad0b279bb-8160a9e8" className="align-y-center-m">
                            <h3 className="emphatic-heading color-primary">{description}</h3>
                        </div>
                        <div id="w-node-_75bf3015-5cd5-48fd-ffc1-6e46554c0c65-8160a9e8" className="d-inline gap-20">
                            {
                                !!(logo_img || []).length && logo_img.map(logo =>
                                    <span key={logo.index} className="w-inline-block"><img src={logo.icon} loading="lazy" alt="" /></span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TrustedFirms;