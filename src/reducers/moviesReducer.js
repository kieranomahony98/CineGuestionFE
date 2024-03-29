import { MOVIES_LOADING, MOVIES_LOADED, MOVIES_LOGOUT, MOVIE_DISCUSSION, MOVIE_EDIT } from "../actions/types";

const initialState = {
    isLoaded: false,
    isLoading: false,
    weeklyPlaylist: null,
    monthlyPlaylist: null,
    allTimePlaylist: null,
    movieDiscussion: null,
    trendingNow: null,
    editMovie: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case MOVIES_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case MOVIES_LOADED:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                weeklyPlaylist: action.payload.weeklyPlaylists,
                monthlyPlaylist: action.payload.monthlyPlaylists,
                allTimePlaylist: action.payload.allTimePlaylists,
                trendingNow: action.payload.trendingNow
            };
        case MOVIE_DISCUSSION:
            return {
                ...state,
                movieDiscussion: action.payload
            }
        case MOVIE_EDIT:
            return {
                ...state,
                editMovie: action.payload
            }
        case MOVIES_LOGOUT:
            return {
                ...state,
                isLoaded: false,
                isLoading: false,
                weeklyPlaylist: null,
                monthlyPlaylist: null,
                allTimePlaylist: null,
                movieDiscussion: null,
                trendingNow: null
            }

        default:
            return state;
    }
}