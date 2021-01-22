import { MOVIES_LOADING, MOVIES_LOADED, MOVIES_LOGOUT } from '../actions/types';

const initialState = {
    isLoaded: false,
    isLoading: false,
    weeklyPlaylist: null,
    montlyPlaylist: null,
    allTimePlaylists: null
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
                allTimePlaylist: action.payload.allTimePlaylists
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