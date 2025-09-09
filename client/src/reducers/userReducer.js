import { FETCH_USERS, ADD_USER, DELETE_USER, CHANGE_PASSWORD, PASSWORD_CHANGED, UPDATE_EMAIL, EMAIL_UPDATED } from "../actions/types";

const initialState = {
    users: [],
    passwordChangeSuccessful: false,
    emailUpdateSuccessful: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload,
                passwordChangeSuccessful: false
            };
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users],
                passwordChangeSuccessful: false
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(users => users._id !== action.payload),
                passwordChangeSuccessful: false
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                users: state.users,
                passwordChangeSuccessful: (action.payload) ? !state.passwordChangeSuccessful : state.passwordChangeSuccessful ,
            }
        case PASSWORD_CHANGED:
            return {
                ...state,
                passwordChangeSuccessful: false
            }
        case UPDATE_EMAIL:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user._id === action.payload._id){
                        user.email = action.payload.email
                    }
                    return user;
                }),
                emailUpdateSuccessful: action.payload.success
            }
        case EMAIL_UPDATED:
            return {
                ...state,
                emailUpdateSuccessful: false
            }
        default:
            return state;
    }
}

export default userReducer;