
import api from '../apiSingleton';

export const SUCCESS_GET_TASKS = 'SUCCESS_GET_TASKS';

export function getTasks(params) {
    return async dispatch => {
        try {
            const response = await api.tasks.getTasks(params);

            if (response.status === 'ok') {
                dispatch({
                    type: SUCCESS_GET_TASKS,
                    tasks: response.message.tasks,
                    totalCount: +response.message.total_task_count
                });
            }

        } catch (error) {
            console.log(error)
        }
    };
}

export function updateTask(id, data, onError, onSuccess ) {
    return async dispatch => {
        try {
            await api.tasks.updateTask(id, data);
            await onSuccess();
        } catch (error) {
            onError(error)
        }
    };
}

export function createTask(data, onError, onSuccess) {
    return async dispatch => {
        try {
            await api.tasks.createTask(data);
            await onSuccess();
        } catch (error) {
            onError(error)
        }
    };
}

