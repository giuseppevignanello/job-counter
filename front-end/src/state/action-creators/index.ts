import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions/index";

export const jobCounter = (count: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.JOBCOUNTER,
            payload: count,
        });
    };
};

export const appliedJobCounter = (count: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.APPLIEDJOBCOUNTER,
            payload: count,
        });
    };
};
export const interviewJobCounter = (count: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.INTERVIEWJOBCOUNTER,
            payload: count,
        });
    };
};
export const offerJobCounter = (count: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.OFFERJOBCOUNTER,
            payload: count,
        });
    };
};
export const refusedJobCounter = (count: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.REFUSEDJOBCOUNTER,
            payload: count,
        });
    };
};
