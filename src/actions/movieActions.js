import { MOVIES_LOADED, MOVIES_LOADING, MOVIES_LOGOUT, MOVIE_DISCUSSION } from "./types";
import axios from "axios";
import route from "data/Routes";
import { convertPlayListsText } from "helpers/convertGenres";
export const loadMovies = () => (dispatch, getState) => {
    dispatch({ type: MOVIES_LOADING });
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify(
        {
            "x-auth-token": token
        }
    );

    if (token) {
        axios.post(`${route}/api/movies/getPlaylists`, body, config)
            .then((res) => {
                if (res.status === 200) {
                    convertPlayListsText(res.data)
                        .then((playlists) => {
                            dispatch({ type: MOVIES_LOADED, payload: playlists });
                        })
                        .catch((err) => {
                            throw err;
                        })
                } else {
                    return null;
                }
            }).catch((err) => {
                console.log(`Failed to get movie playlists: ${err.message}`);
                throw err;
            });
    }
}
export const addMovieDiscussion = (movie) => dispatch => {
    dispatch({ type: MOVIE_DISCUSSION, payload: movie });

    const config = {
        headers: {
            "Content-Type": "application/json"

        }
    }
    axios.post(`${route}/api/movies/discussions/create`, movie, config)
}

export const logOutMovies = () => dispatch => {
    dispatch({ type: MOVIES_LOGOUT });
}