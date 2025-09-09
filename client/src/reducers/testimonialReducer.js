import { FETCH_TESTIMONIAL, ADD_TESTIMONIAL, DELETE_TESTIMONIAL, EDIT_TESTIMONIAL} from "../actions/types";

const initialState = {
    testimonials: [],
}

const testimonials = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TESTIMONIAL:
            return {
                ...state,
                testimonials: action.payload
            };
        case ADD_TESTIMONIAL:
            return {
                ...state,
                testimonials: [action.payload, ...state.testimonials]
            };
        case DELETE_TESTIMONIAL:
            return {
                ...state,
                testimonials: state.testimonials.filter(testimonials => testimonials._id !== action.payload),
            };
        case EDIT_TESTIMONIAL:
            return {
                ...state,
                testimonials: state.testimonials.map(testimonial => {
                    if(testimonial._id === action.payload._id){
                        testimonial = action.payload;
                        testimonial.photo = testimonial?.localview;
                        delete testimonial.localview;
                    }
                    return testimonial;
                }), 
            };
        default:
            return state;
    }
}

export default testimonials;