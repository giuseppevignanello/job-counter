import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterReducer";
import searchReducer from "./searchReducer";

const reducers = combineReducers({
    counter: counterReducer,
    search: searchReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
