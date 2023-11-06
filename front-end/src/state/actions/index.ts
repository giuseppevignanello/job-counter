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
    payload: Record<string, Job[]>;
}

interface CategoriesAction {
    type: ActionType.CATEGORIES;
    payload: Array<String>;
}

interface CategorizedJobsAction {
    type: ActionType.CATEGORIZEDJOBS;
    payload: Record<string, Job[]>;
}

export type Action = JobsAction | CategoriesAction | CategorizedJobsAction;
