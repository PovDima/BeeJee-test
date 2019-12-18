import {
    SUCCESS_GET_TASKS
} from '../actions/tasks';

const initialState = {
    tasks: [],
    totalCount: 0
};

export default function tasks(state = initialState, action) {
    const { type, tasks, totalCount } = action;

    switch (type) {
        case SUCCESS_GET_TASKS:
            return { ...state, tasks, totalCount };
        default:
            return state;
    }
}
