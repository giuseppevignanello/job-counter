import { ActionType } from "../action-types/index";
export interface Job {
    id: number;
    time: string;
    title: string;
    company: string;
    category_id: number;
}
interface JobsAction {
    type: ActionType.JOBS;
    payload: Array<String>;
}

interface CategoriesAction {
    type: ActionType.CATEGORIES;
    payload: Array<String>;
}

interface CategorizedJobsAction {
    type: ActionType.CATEGORIZEDJOBS;
    payload: Record<string, Job[]>;
}

interface Search {
    type: ActionType.SEARCH;
    payload: string;
}

interface Message {
    type: ActionType.MESSAGE;
    payload: string;
}

export type Action =
    | JobsAction
    | CategoriesAction
    | CategorizedJobsAction
    | Search
    | Message;
