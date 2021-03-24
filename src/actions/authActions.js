import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, UPDATE_DETAILS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, CHANGE_STATUS } from "../actions/types";
import { returnErrors, clearErrors, loginErrors } from "./errorActions";
import { loadMovies } from "./movieActions";
import { getRequest, postRequest } from "axios/axiosHandler";
//https://www.youtube.com/watch?v=93p3LxR9xfM&t=3236s&ab_channel=TraversyMedia this youtube video helped me build the outline of this file
//Check token & load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING });

    //get token from local storage
    const token = getState().auth.token;

    if (!token) {
        dispatch(returnErrors("Token is Null", "401"));
        dispatch({
            type: AUTH_ERROR
        });
        return;
    }

    getRequest("/api/users/user", token, true)
        .then((data) => {
            dispatch({ type: USER_LOADED, payload: { user: data.user, token } });
            dispatch(clearErrors())
            if (!getState().movies.isLoaded) {
                dispatch(loadMovies());
            }
        }).catch((err) => {
            console.log(err);
            dispatch(returnErrors(err.response?.data ? err.response.data : "Unknown error: load user failed", err.status ? err.status : 500))
            dispatch({
                type: AUTH_ERROR
            });
        });

}

export const login = ({ email, password }) => dispatch => {
    dispatch({ type: USER_LOADING });

    //data body
    const body = JSON.stringify({ email, password });
    postRequest("/api/auth/login", body)
        .then((data) => {
            console.log(data);
            dispatch(clearErrors());
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: data.user,
                    token: data.token
                }
            });
        }).catch((err) => {
            console.log(err);
            dispatch(loginErrors(err.response?.data ? err.response.data : "Unknown error: Login failed", err.status ? err.status : 500));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

export const register = ({ name, email, password, userName }) => (dispatch) => {
    const body = JSON.stringify({ name, email, password, userName });

    postRequest("/api/auth/register", body)
        .then((data) => {
            dispatch(clearErrors());
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    user: data.user,
                    token: data.token
                }
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

    const token = getState().auth.token;
    const body = JSON.stringify({ userDetails })

    if (token) {
        postRequest("/api/users/update", body, token)
            .then((data) => {
                dispatch({
                    type: UPDATE_DETAILS,
                    payload: data
                });
                return data;

            }).catch((err) => {
                dispatch(returnErrors(err.response.data ? err.response.data : "Failed to update", err.status ? err.status : 500));
            });
    }
}
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS });
}

