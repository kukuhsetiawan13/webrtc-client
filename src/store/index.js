import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'
import userReducer from "./reducers/userReducer";
import groupReducer from "./reducers/groupReducer";
import messageReducer from "./reducers/messageReducer";
import socketReducer from "./reducers/scoketReducer";

const rootReducer = combineReducers ({
    userReducer, groupReducer, messageReducer, socketReducer
})

const store = createStore(rootReducer, applyMiddleware( thunk))
export default store