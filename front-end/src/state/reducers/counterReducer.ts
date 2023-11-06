import { ActionType } from "../action-types";
import { Action } from "../actions/index";

const initialState = {
    jobs: [],
    categories: [],
    categorizedJobs: [],
};

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.JOBS:
            return { ...state, jobs: action.payload };
        case ActionType.CATEGORIES:
            return { ...state, categories: action.payload };
        case ActionType.CATEGORIZEDJOBS:
            return { ...state, categorizedJobs: action.payload };

        default:
            return state;
    }
};

export default reducer;
