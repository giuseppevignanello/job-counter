import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions/index";

interface Job {
    id: number;
    time: string;
    title: string;
    company: string;
    category_id: number;
}

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

export const categorizedJobs = (list: Record<string, Job[]>) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CATEGORIZEDJOBS,
            payload: list,
        });
    };
};

export const search = (search: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEARCH,
            payload: search,
        });
    };
};

export const message = (message: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.MESSAGE,
            payload: message,
        });
    };
};
