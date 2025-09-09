import { FETCH_TOOLS, ADD_TOOL, DELETE_TOOL, EDIT_TOOL, RENTAL_ERROR, SUBMIT_RENTAL} from "../actions/types";

const initialState = {
    tools: [],
    success: false,
}

const toolReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOOLS:
            return {
                ...state,
                tools: action.payload
            };
        case ADD_TOOL:
            return {
                ...state,
                tools: [action.payload, ...state.tools]
            };
        case DELETE_TOOL:
            return {
                ...state,
                tools: state.tools.filter(tools => tools._id !== action.payload),
            };
        case EDIT_TOOL:
            return {
                ...state,
                tools: state.tools.map(tool => {
                    if(tool._id === action.payload._id){
                        tool = action.payload;
                        tool.photo = tool?.localview;
                        delete tool.localview;
                    }
                    return tool;
                }), 
            };
        case SUBMIT_RENTAL:
            return {
                ...state,
                success: action.payload,
            };
        case RENTAL_ERROR:
            return {
                ...state,
                success: false,
            };
        default:
            return state;
    }
}

export default toolReducer;