import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions/index";

export const jobs = (list: Array<string>) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.JOBS,
            payload: list,
        });
    };
};

export const categories = (list: Array<string>) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CATEGORIES,
            payload: list,
        });
    };
};

export const categorizedJobs = (list: Array<string>) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CATEGORIZEDJOBS,
            payload: list,
        });
    };
};
