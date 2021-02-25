import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import movieReducer from "./moviesReducer";
import { combineReducers } from "redux";

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    movies: movieReducer
});

