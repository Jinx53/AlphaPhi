import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import { dashboardTheme } from './dashboardTheme';
import store from './store';
import { Provider } from 'react-redux';
import loadable from '@loadable/component';
import App from './App';
import Home from './components/admin/Home';

const AboutUs = loadable(() => import('./components/pages/AboutUs'), {fallback: <h2>Loading About us...</h2>})
const NotFound = loadable(() => import('./components/pages/NotFound'), {fallback: <h2>Loading 404...</h2>})
const ContactUs = loadable(() => import('./components/pages/ContactUs'), {fallback: <h2>Loading Contact us...</h2>})
const ResourceTeam = loadable(() => import('./components/pages/ResourceTeam'), {fallback: <h2>Loading Resource team...</h2>})
const Services = loadable(() => import('./components/pages/Services'), {fallback: <h2>Loading services...</h2>})
const Fabrication = loadable(() => import('./components/pages/Fabrication'), {fallback: <h2>Loading services fabrication...</h2>})
const Trainings = loadable(() => import('./components/pages/Trainings'), {fallback: <h2>Loading services training...</h2>})
const Repair = loadable(() => import('./components/pages/Repair'), {fallback: <h2>Loading services repair...</h2>})
const Procurement = loadable(() => import('./components/pages/Procurement'), {fallback: <h2>Loading services procurement...</h2>})
const Consultancy = loadable(() => import('./components/pages/Consultancy'), {fallback: <h2>Loading services consultancy...</h2>})
const Rentals = loadable(() => import('./components/pages/Rentals'), {fallback: <h2>Loading services rentals...</h2>})
const Tools = loadable(() => import('./components/pages/Tools'), {fallback: <h2>Loading Tools...</h2>})
const Login = loadable(() => import('./components/pages/Login'), {fallback: <h2>Loading Login...</h2>})
const SignUp = loadable(() => import('./components/pages/SignUp'), {fallback: <h2>Loading Sign up...</h2>})
const Users = loadable(() => import('./components/admin/Users'), {fallback: <h2>Loading User page...</h2>})
const AdminTools = loadable(() => import('./components/admin/Tools'), {fallback: <h2>Loading Tools page...</h2>})
const AdminServices = loadable(() => import('./components/admin/Services'), {fallback: <h2>Loading Services page...</h2>})
const AdminResourceTeam = loadable(() => import('./components/admin/ResourceTeam'), {fallback: <h2>Loading Resource team page...</h2>})
const AdminContactUs = loadable(() => import('./components/admin/ContactUs'), {fallback: <h2>Loading Contact us page...</h2>})
const AdminAboutUs = loadable(() => import('./components/admin/AboutUs'), {fallback: <h2>Loading About us page...</h2>})
const AdminTestimonial = loadable(() => import('./components/admin/Testimonial'), {fallback: <h2>Loading Testimonial page...</h2>})
const AdminSubscribers = loadable(() => import('./components/admin/Subscribers'), {fallback: <h2>Loading subscriber page...</h2>})

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={dashboardTheme}>
          <BrowserRouter >
            <Routes>
              <Route path='/' element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="admin/aboutus" element={<AdminAboutUs />} />
                <Route path='admin/contact' element={<AdminContactUs />} />
                <Route path='contact' element={<ContactUs />} />
                <Route path='admin/resourceteam' element={<AdminResourceTeam />} />
                <Route path='resourceteam' element={<ResourceTeam />} />
                <Route path='admin/services' element={<AdminServices />} />
                <Route path='services' element={<Services />} />
                <Route path='services/fabrication' element={<Fabrication />} />
                <Route path='services/trainings' element={<Trainings />} />
                <Route path='services/repair' element={<Repair />} />
                <Route path='services/procurement' element={<Procurement />} />
                <Route path='services/consultancy' element={<Consultancy />} />
                <Route path='services/rentals' element={<Rentals />} />
                <Route path='admin/tools' element={<AdminTools />} />
                <Route path='tools' element={<Tools />} />
                <Route path='admin/users' element={<Users />} />
                <Route path='admin/testimonial' element={<AdminTestimonial />} />
                <Route path='admin/subscribers' element={<AdminSubscribers />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='admin' element={<Login />} />
                <Route path='*' element={<NotFound/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
