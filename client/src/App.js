
import AdminNavbar from './components/Navbar/AdminNavbar';
import Header from './components/Navbar/Header';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box } from '@mui/material';
import BasicCard from './components/common/BasicCard';
import Footer from './components/Navbar/Footer';
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { reAuthenticate } from "./actions/AuthAction";
import { useMediaQuery, useTheme } from "@mui/material";
import './App.css';

function App() {

  const { isAuthenticated, token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();



  useEffect(() => {
    const adminroute = ["/admin", "/admin/users"];
    const item = location?.state ?? { route: "/", index: -1 };
    if (!isAuthenticated && !token) {
      if (adminroute.includes(location.pathname) || !location.state?.index) changeLink({ route: "/", index: -1 });
      else {
        changeLink(item);
      }
    } else if (!isAuthenticated && token) {
      dispatch(reAuthenticate());
    }

  }, [isAuthenticated, token]);

  const changeLink = (item) => {
    navigate(item?.route, { state: { route: item?.route, index: item?.index.toString() } });
  };

  const tabletScreen = useMediaQuery(theme.breakpoints.down('laptop'));
  const phoneScreen = useMediaQuery(theme.breakpoints.down('tablet'));
  const appStyle = phoneScreen ? { width: "fit-content" } : tabletScreen ? { width: "920px" } : {}

  return (
    <>
      {(!isAuthenticated) ? <Header changeLink={changeLink} /> : <AdminNavbar />}
      {(!isAuthenticated) ? <div><Outlet /> <Footer changeLink={changeLink} /></div> : <BasicCard content={<Outlet />} />}
    </>
  );
}

export default App;
