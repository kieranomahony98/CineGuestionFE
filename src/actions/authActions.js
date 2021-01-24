import axios from "axios";
import route from "data/Routes";
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS } from "../actions/types";
import { returnErrors, clearErrors, loginErrors } from "./errorActions";
import { loadMovies } from "./movieActions";


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
        axios.post(`${route}/api/users/user`, config)
            .then((res) => {
                dispatch({ type: USER_LOADED, payload: res.data });
                if (!getState().movies.isLoaded) {
                    dispatch(loadMovies());

                }
            }).catch((err) => {
                dispatch(returnErrors(err.response.data, err.response.status))
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
            dispatch(loginErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

export const register = ({ name, email, password }) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ name, email, password });

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


export const logout = () => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS });
}

