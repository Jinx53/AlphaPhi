import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Tab, Tabs, useMediaQuery, useTheme} from '@mui/material';
import { useNavigate, useLocation} from "react-router-dom";
import { navBarItems } from './consts/navTabItems';
import whitelogo from '../../logo/white.PNG';
import darklogo from '../../logo/dark.PNG';
import { useSelector } from "react-redux";
import { InsertEmoticonSharp } from '@mui/icons-material';

function a11yProps(item) {
  return {
    id: `alphapi-tab-${item.index}`,
    'aria-controls': `alphapi-tabpanel-${item.index}`,
  };
}



export default function NavTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);


  useEffect(() => {
    const adminroute = ["/admin", "/admin/users"];
    if ( adminroute.includes(location.pathname) || !location.state) setValue(0);
    else setValue(Number(location.state));
  }, [location])
  

  const theme = useTheme();
  const screenSize = useMediaQuery(theme.breakpoints.down("laptop"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClick = (item) => {
    navigate(item.route, {state: item.index.toString()})
  };

  const LaptopStyle = {
    display: "grid",
    gridTemplateColumns: "3fr 4fr"
  }
  const phoneStyle = {
    display: "grid",
    rowGap: "2%"
  }

  const logoPhone = {
    display: "flex",
    justifyContent: "center"
  }

  const logo = theme.palette.mode === 'dark' ? darklogo : whitelogo;

  return (
    <Box sx={{ width: '100%'}}>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={screenSize ? phoneStyle : LaptopStyle}>
            <div style={screenSize ? logoPhone : null}>
              <a href='\'>
                <img src={logo} alt='logo' loading='lazy' style={{width: '100px', padding: '2% 2% 0% 2%'}}/>
              </a>  
            </div>
            <Tabs value={value} onChange={handleChange} aria-label="navigation tabs" sx={{overflow: "auto"}}>
              {navBarItems.map((item) => (
                <Tab key={item.index} label={item.label} {...a11yProps(item)} onClick={() => onClick(item) }/>
              ))}
            </Tabs>
          </Box>
        </Box>
    </Box>
  );
}
