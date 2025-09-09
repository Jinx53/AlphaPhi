import { FETCH_SERVICES, ADD_SERVICE, DELETE_SERVICE, EDIT_SERVICE } from "../actions/types";

const initialState = {
    services: [],
    training: [],
}

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SERVICES:
            return {
                ...state,
                services: action.payload
            };
        case ADD_SERVICE:
            return {
                ...state,
                services: [action.payload, ...state.services]
            };
        case DELETE_SERVICE:
            return {
                ...state,
                services: state.services.filter(services => services._id !== action.payload),
            };
        case EDIT_SERVICE:
            return {
                ...state,
                services: state.services.map(services => {
                    if(services._id === action.payload._id){
                        services = action.payload
                    }
                    return services;
                }), 
            };
        default:
            return state;
    }
}

export default serviceReducer;