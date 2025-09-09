import { combineReducers } from "redux";
import aboutReducer from './aboutReducer';
import contactReducer from './contactReducer';
import resourceReducer from './resourceReducer';
import toolReducer from './toolReducer';
import serviceReducer from './serviceReducer';
import testimonials from './testimonialReducer';
import subscriber from './subscriberReducer';
import users from './userReducer';
import auth from './authReducer';
import error from './errorReducer';

export default combineReducers({
    aboutus: aboutReducer,
    contactus: contactReducer,
    resourceteam: resourceReducer,
    toolsState: toolReducer,
    services: serviceReducer,
    testimonials,
    subscriber,
    users,
    auth,
    error
});