import { GET_ERRORS, CLEAR_ERRORS, LOGIN_ERROR } from "./types";

//https://www.youtube.com/watch?v=93p3LxR9xfM&t=3236s&ab_channel=TraversyMedia this youtube video helped me build the outline of this file

//return errors 
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {
            msg,
            status,
            id
        }
    };
};

export const loginErrors = (msg) => {
    return {
        type: LOGIN_ERROR,
        payload: {
            msg
        }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};