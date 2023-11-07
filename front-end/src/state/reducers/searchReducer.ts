import { ActionType } from "../action-types";
import { Action } from "../actions/index";

const initialState = {
    search: "",
};

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.SEARCH:
            return { ...state, search: action.payload };

        default:
            return state;
    }
};

export default reducer;
