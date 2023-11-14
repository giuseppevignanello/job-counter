import { ActionType } from "../action-types";
import { Action } from "../actions/index";

const initialState = {
    message: "",
};

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.MESSAGE:
            return { ...state, message: action.payload };

        default:
            return state;
    }
};

export default reducer;
