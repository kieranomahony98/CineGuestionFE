import errorReducer from './errorReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    error: errorReducer,
    auth: authReducer
});

