import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import combineReducers from "../src/reducers";
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";

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

