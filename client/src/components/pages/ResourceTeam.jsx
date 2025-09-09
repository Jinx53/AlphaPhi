import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import separator from "../../images/separator.svg";
import email from "../../images/Email.svg";
import facebook from "../../images/Facebook.svg";
import linkedIn from "../../images/LinkedIn.svg";

import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/About.css';
import '../../styles/Home.css';
import { connect } from 'react-redux';
import { getResourceTeam } from "../../actions/ResourceAction";

export const ResourceTeam = (props) => {

    useEffect(() => {
        props.getResourceTeam();
    }, []);

    const notFound = (<div className="w-dyn-empty">
        <div>No items found.</div>
    </div>)


    return (
        <>
            <section className="section short bg-dirty">
                <div className="w-layout-blockcontainer container wide w-container">
                    <div className="my-20">
                        <div className="text-center">
                            <h1>Meet our team</h1><img src={separator} loading="lazy" alt="" />
                        </div>
                        <div className="my-10 w-dyn-list grid-x3-l fr-3-2">
                            {props.resourceteam.length ?
                                props.resourceteam.map((team, i) =>
                                    <div role="list" key={i}>
                                        <div role="listitem" className="profile">
                                            <div className="flex-h">
                                                <img src={team.photo} loading="lazy" alt="" className="profile-img" />
                                                <div className="profile-content">
                                                    <div className="profile-name my-02">{team.name}</div>
                                                    <div className="profile-job color-primary mb-10">{team.role}</div>
                                                    <p className="profile-description">{team.duty}</p>
                                                    <div className="profile-links">
                                                        <ul role="list" className="link-list w-list-unstyled">
                                                            <li>
                                                                <a href="#" className="profile-link w-inline-block"><img src={email} loading="lazy" alt="" /></a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="profile-link w-inline-block"><img src={facebook} loading="lazy" alt="" /></a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="profile-link w-inline-block"><img src={linkedIn} loading="lazy" alt="" /></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>) 
                                : notFound}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


ResourceTeam.propTypes = {
    getResourceTeam: PropTypes.func,
    resourceteam: PropTypes.array
};

const mapStateToProps = state => ({
    resourceteam: state.resourceteam.resourceteam
})

export default connect(mapStateToProps, { getResourceTeam })(ResourceTeam);
