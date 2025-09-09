import { FETCH_RESOURCETEAM, ADD_RESOURCETEAM, DELETE_RESOURCETEAM, EDIT_RESOURCETEAM} from "../actions/types";

const initialState = {
    resourceteam: [],
}

const resourceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESOURCETEAM:
            return {
                ...state,
                resourceteam: action.payload
            };
        case ADD_RESOURCETEAM:
            return {
                ...state,
                resourceteam: [action.payload, ...state.resourceteam]
            };
        case DELETE_RESOURCETEAM:
            return {
                ...state,
                resourceteam: state.resourceteam.filter(resourceteam => resourceteam._id !== action.payload),
            };
        case EDIT_RESOURCETEAM:
            return {
                ...state,
                resourceteam: state.resourceteam.map(resourceteam => {
                    if(resourceteam._id === action.payload._id){
                        resourceteam = action.payload;
                        resourceteam.photo = resourceteam?.localview;
                        delete resourceteam.localview;
                    }
                    return resourceteam;
                }), 
            };
        default:
            return state;
    }
}

export default resourceReducer;