import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterReducer";
import searchReducer from "./searchReducer";
import messageReducer from "./messageReducer";

const reducers = combineReducers({
    counter: counterReducer,
    search: searchReducer,
    message: messageReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
