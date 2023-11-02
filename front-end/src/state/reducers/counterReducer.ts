import { ActionType } from "../action-types";
import { Action } from "../actions/index";

const initialState = {
    jobCounter: 0,
    appliedJobCounter: 0,
    interviewJobCounter: 0,
    offerJobCounter: 0,
    refusedJobCounter: 0,
};

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.JOBCOUNTER:
            return { ...state, jobCounter: action.payload };
        case ActionType.APPLIEDJOBCOUNTER:
            return { ...state, appliedJobCounter: action.payload };
        case ActionType.INTERVIEWJOBCOUNTER:
            return { ...state, interviewJobCounter: action.payload };
        case ActionType.OFFERJOBCOUNTER:
            return { ...state, offerJobCounter: action.payload };
        case ActionType.REFUSEDJOBCOUNTER:
            return { ...state, refusedJobCounter: action.payload };
        default:
            return state;
    }
};

export default reducer;
