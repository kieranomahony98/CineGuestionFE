import { MOVIES_LOADED, MOVIES_LOADING, MOVIES_LOGOUT } from './types';
import axios from 'axios';
import route from 'data/Routes';
export const loadMovies = () => (dispatch, getState) => {
    dispatch({ type: MOVIES_LOADING });
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(
        {
            'x-auth-token': token
        }
    );


    if (token) {
        axios.post(`${route}/api/movies/getPlaylists`, body, config)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({ type: MOVIES_LOADED, payload: res.data });
                } else {
                    return null;
                }
            }).catch((err) => {
                console.log(`Failed to get movie playlists: ${err.message}`);
                throw err;
            });
    }
}

export const logOutMovies = () => dispatch => {
    dispatch({ type: MOVIES_LOGOUT });
}