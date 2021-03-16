import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import combineReducers from "../src/reducers";
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";
//https://www.youtube.com/watch?v=93p3LxR9xfM&t=3236s&ab_channel=TraversyMedia this youtube video helped me build the outline of this file

const initialState = {};

const middleware = [thunk];
const persistConfig = {
    key: "root",
    storage
};
const persistedReducer = persistReducer(persistConfig, combineReducers);

export const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middleware),
        (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ));
export const persistor = persistStore(store);

