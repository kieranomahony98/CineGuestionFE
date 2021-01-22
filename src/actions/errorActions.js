import { GET_ERRORS, CLEAR_ERRORS, LOGIN_ERROR } from './types';

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