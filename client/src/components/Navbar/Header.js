import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { navBarItems } from './consts/navTabItems';
import { styled, useTheme, useMediaQuery } from '@mui/material';
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Header.css';
import logo from "../../images/a-Phi-Logo.svg";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useLocation } from "react-router-dom";

function a11yProps(item) {
    return {
        id: `alphapi-tab-${item.label}`,
        'aria-controls': `alphapi-tabpanel-${item.label}`,
    };
}

export default function Header({ changeLink }) {


    const [open, setOpen] = useState(false);

    const theme = useTheme();

    const handleDropDown = (e) => {
        e.preventDefault()
        setOpen(!open)
    }

    const phoneView = useMediaQuery(theme.breakpoints.down('laptop'));


    const location = useLocation();

    const navOverlay = !open ? "w-nav-overlay" : "";
    const navOverlayStyle = !open ? { height: "5184px", display: "block" } : {};
    const iconNav = open ? "nav-menu-btn w-nav-button w--open" : "nav-menu-btn w-nav-button";
    const itemNav = open ? "nav-item w-nav-link w--nav-link-open" : "nav-item w-nav-link";
    const itemNavOpen = open ? "nav-item w-nav-link w--nav-link-open w--current" : "nav-item w-nav-link w--current";
    const itemStyle = open ? { maxWidth: "1010px" } : {};
    const navStyle = open ? { transform: "translateY(0px) translateX(0px)", transition: "transform 400ms ease 0s" } : {};
    const navDrop = open ? "nav-menu w-nav-menu nav-dropdown-menu-open" : "nav-menu w-nav-menu";


    useEffect(() => {
        if (!phoneView) setOpen(false)
    }, [phoneView]);

    useEffect(() => {
        setOpen(false);
    }, [location?.state?.route]);

    return (
        <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" data-doc-height="1" role="banner" className="navbar w-nav">
            <div className="container w-container">

                <div onClick={() => changeLink({ route: "/", index: -1 })} aria-current="page" className="brand-logo w-nav-brand w--current" aria-label="home">
                    <img src={logo} loading="lazy" width="Auto" height="Auto" alt="logo" />
                </div>
                <nav role="navigation" className={navDrop} onClick={() => setOpen(false)} style={navStyle}>
                    {navBarItems.map((item) =>
                        <a tabIndex={item.index} key={item.index} {...a11yProps(item)} onClick={() => changeLink(item)} className={(location?.state?.index == item?.index) ? itemNavOpen : itemNav} style={itemStyle}>{item.label}</a>
                    )}
                </nav>
                {phoneView && open && (
                    <div className={navOverlay} id="w-nav-overlay-0" style={navOverlayStyle}></div>
                )}
                <div className={iconNav}>
                    <IconButton onClick={handleDropDown}>
                        {open ? <CloseIcon className="w-icon-nav-menu" sx={{ color: "#C8C8C8", fontSize: 30 }} /> : <MenuIcon className="w-icon-nav-menu" sx={{ color: "#C8C8C8", fontSize: 30 }} />}
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
