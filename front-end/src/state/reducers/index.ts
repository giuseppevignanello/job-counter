import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterReducer";

const reducers = combineReducers({
    counter: counterReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
