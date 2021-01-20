import { MOVIES_LOADING, MOVIES_LOADED, MOVIES_LOGOUT } from '../actions/types';

const initialState = {
    isLoaded: false,
    isLoading: true,
    weeklyPlaylist: null,
    montlyPlaylist: null
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
                montlyPlaylist: action.payload.montlyPlaylists
            };
        case MOVIES_LOGOUT:
            return {
                ...state,
                isLoaded: false,
                isLoading: false,
                weeklyPlaylist: null,
                montlyPlaylist: null
            }
        default:
            return state;
    }
}