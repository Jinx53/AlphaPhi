import { FETCH_SUBSCRIBER, ADD_SUBSCRIBER, DELETE_SUBSCRIBER, EDIT_SUBSCRIBER} from "../actions/types";

const initialState = {
    subscribers: [],
}

const subscriber = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUBSCRIBER:
            return {
                ...state,
                subscribers: action.payload
            };
        case ADD_SUBSCRIBER:
            return {
                ...state,
                subscribers: [action.payload, ...state.subscribers]
            };
        case DELETE_SUBSCRIBER:
            return {
                ...state,
                subscribers: state.subscribers.filter(subscribe => subscribe._id !== action.payload),
            };
        case EDIT_SUBSCRIBER:
            return {
                ...state,
                subscribers: state.subscribers.map(subscribe => {
                    if(subscribe._id === action.payload._id){
                        subscribe = action.payload;
                    }
                    return subscribe;
                }), 
            };
        default:
            return state;
    }
}

export default subscriber;