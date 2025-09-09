import { FETCH_CONTACTUS, ADD_CONTACTUS, DELETE_CONTACTUS, EDIT_CONTACTUS, SET_CONTACTUS_ACTIVE} from "../actions/types";

const initialState = {
    contactus: [],
    activeContact: {}
}

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTACTUS:
            const [activecontact] = action.payload.filter(contact => contact.active)
            return {
                ...state,
                contactus: action.payload,
                activeContact: { ...activecontact}
            };
        case ADD_CONTACTUS:
            return {
                ...state,
                contactus: [action.payload, ...state.contactus]
            };
        case DELETE_CONTACTUS:
            return {
                ...state,
                contactus: state.contactus.filter(contactus => contactus._id !== action.payload),
            };
        case EDIT_CONTACTUS:
            return {
                ...state,
                contactus: state.contactus.map(contactus => {
                    if(contactus._id === action.payload._id){
                        contactus = action.payload
                    }
                    return contactus;
                }), 
            };
        case SET_CONTACTUS_ACTIVE:
            let active = {}
            return {
                ...state,
                contactus: state.contactus.map(contactus => {
                    if(contactus._id === action.payload._id && action.payload.active){
                        contactus.active = action.payload.active;
                        active = contactus;
                    }else contactus.active = !action.payload.active;
                    return contactus;
                }),
                activeContact: { ...active}
            };
        default:
            return state;
    }
}

export default contactReducer;