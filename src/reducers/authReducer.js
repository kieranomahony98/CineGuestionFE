import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, MOVIES_LOADED, CHANGE_STATUS } from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    justLoggedIn: false,
    justRegistered: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                justLoggedIn: false,
                justRegistered: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                justLoggedIn: true
            }
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                justRegistered: true
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                justLoggedIn: false,
                justRegistered: false
            }
        case CHANGE_STATUS:
            return {
                ...state,
                justLoggedIn: false,
                justRegistered: false
            }
        case MOVIES_LOADED:
            return {
                ...state,
            }
        default:
            return state

    }
}
