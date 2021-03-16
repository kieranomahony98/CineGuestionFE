import { GET_ERRORS, CLEAR_ERRORS, LOGIN_ERROR, UPDATE_FAIL } from "../actions/types";

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