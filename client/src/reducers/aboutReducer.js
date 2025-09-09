import { FETCH_ABOUT, ADD_ABOUT, DELETE_ABOUT, EDIT_ABOUT } from "../actions/types";

const initialState = {
    aboutus: [],
}

const aboutReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ABOUT:
            return {
                ...state,
                aboutus: action.payload
            };
        case ADD_ABOUT:
            return {
                ...state,
                aboutus: [action.payload, ...state.aboutus]
            };
        case DELETE_ABOUT:
            return {
                ...state,
                aboutus: state.aboutus.filter(aboutus => aboutus._id !== action.payload),
            };
        case EDIT_ABOUT:
            return {
                ...state,
                aboutus: state.aboutus.map(aboutus => {
                    if(aboutus._id === action.payload._id){
                        aboutus = action.payload
                    }
                    return aboutus;
                }), 
            };
        default:
            return state;
    }
}

export default aboutReducer;