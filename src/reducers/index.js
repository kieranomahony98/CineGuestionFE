import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import movieReducer from "./moviesReducer";
import { combineReducers } from "redux";
//https://www.youtube.com/watch?v=93p3LxR9xfM&t=3236s&ab_channel=TraversyMedia this youtube video helped me build the outline of this file

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    movies: movieReducer
});

