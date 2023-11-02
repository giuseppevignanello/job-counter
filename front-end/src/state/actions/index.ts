import { ActionType } from "../action-types/index";

interface JobCounterAction {
    type: ActionType.JOBCOUNTER;
    payload: number;
}

interface AppyledJobCounterAction {
    type: ActionType.APPLIEDJOBCOUNTER;
    payload: number;
}

interface InterviewJobCounterAction {
    type: ActionType.INTERVIEWJOBCOUNTER;
    payload: number;
}

interface OfferJobCounterAction {
    type: ActionType.OFFERJOBCOUNTER;
    payload: number;
}

interface RefusedJobCounterAction {
    type: ActionType.REFUSEDJOBCOUNTER;
    payload: number;
}

export type Action =
    | JobCounterAction
    | AppyledJobCounterAction
    | InterviewJobCounterAction
    | OfferJobCounterAction
    | RefusedJobCounterAction;
