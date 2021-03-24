import { GET_ERRORS, CLEAR_ERRORS, LOGIN_ERROR } from "../actions/types";
//https://www.youtube.com/watch?v=93p3LxR9xfM&t=3236s&ab_channel=TraversyMedia this youtube video helped me build the outline of this file

const intialState = {
    msg: "",
    status: null,
    id: null,
    loginError: null,
};

export default function (state = intialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        case CLEAR_ERRORS:
            return {
                msg: "",
                status: null,
                id: null
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.payload.msg
            }
        default:
            return state;
    }
}