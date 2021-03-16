import axios from "axios";
import route from "data/Routes";
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, UPDATE_DETAILS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, CHANGE_STATUS, UPDATE_FAIL } from "../actions/types";
import { returnErrors, clearErrors, loginErrors } from "./errorActions";
import { loadMovies } from "./movieActions";

//https://www.youtube.com/watch?v=93p3LxR9xfM&t=3236s&ab_channel=TraversyMedia this youtube video helped me build the outline of this file
//Check token & load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING });

    //get token from local storage
    const token = getState().auth.token;
    //req headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if (token) {
        config.headers["x-auth-token"] = token;
        axios.post(`${route}/api/users/user`, {}, config)
            .then((res) => {
                dispatch({ type: USER_LOADED, payload: res.data });
                dispatch(clearErrors())
                if (!getState().movies.isLoaded) {
                    dispatch(loadMovies());

                }
            }).catch((err) => {
                dispatch(returnErrors(err.response.data ? err.response.data : "Unknown error: load user failed", err.status ? err.status : 500))
                dispatch({
                    type: AUTH_ERROR
                });
            });
    } else {
        dispatch(returnErrors("Token is Null", "401"));
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const login = ({ email, password }) => dispatch => {
    dispatch({ type: USER_LOADING });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    //data body
    const body = JSON.stringify({ email, password });
    axios.post(`${route}/api/auth/login`, body, config)
        .then((res) => {
            dispatch(clearErrors());
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(loadMovies());
        }).catch((err) => {
            dispatch(loginErrors(err.response.data ? err.response.data : "Unknown error: Login failed", err.status ? err.status : 500));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

export const register = ({ name, email, password, userName }) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ name, email, password, userName });

    axios.post(`${route}/api/auth/register`, body, config)
        .then((res) => {
            dispatch(clearErrors());
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

export const changeBadgeStatus = () => (dispatch) => {
    dispatch({ type: CHANGE_STATUS });
}

export const updateDetails = (userDetails) => (dispatch, getState) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const token = getState().auth.token;

    if (token) {
        const body = JSON.stringify({ userDetails })
        config.headers["x-auth-token"] = token;
        axios.post(`${route}/api/users/update`, body, config)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    dispatch({
                        type: UPDATE_DETAILS,
                        payload: res.data
                    });
                }
                return res.data;
            }).catch((err) => {
                dispatch(returnErrors(err.response.data ? err.response.data : "Failed to update", err.status ? err.status : 500));
            });
    }
}
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS });
}

