import { MOVIES_LOADED, MOVIES_LOADING, MOVIES_LOGOUT, MOVIE_DISCUSSION, MOVIE_EDIT } from "./types";
import { convertPlayListsText } from "helpers/convertGenres";
import { getRequest, postRequest } from "axios/axiosHandler";
export const loadMovies = () => (dispatch, getState) => {
    dispatch({ type: MOVIES_LOADING });
    const token = getState().auth.token;

    if (!token) return null;

    getRequest("/api/movies/getPlaylists", token)
        .then((data) => {
            convertPlayListsText(data)
                .then((playlists) => {
                    dispatch({ type: MOVIES_LOADED, payload: playlists });
                });
        }).catch((err) => {
            throw err;
        })
}

export const addMovieDiscussion = (movie) => dispatch => {
    dispatch({ type: MOVIE_DISCUSSION, payload: movie });

    const config = {
        headers: {
            "Content-Type": "application/json"

        }
    }
    postRequest("/api/movies/discussions/create", movie)
}
export const addMovieToEdit = (movie, dispatch) => {
    dispatch({ Type: MOVIE_EDIT, payload: movie });
}
export const logOutMovies = () => dispatch => {
    dispatch({ type: MOVIES_LOGOUT });
}

