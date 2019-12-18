import ApiClient from './apiClient';
import TasksAPI from './Tasks';
import LoginAPI from './Login';

export default function ({ apiPrefix } = {}) {
    if (!apiPrefix) {
        throw new Error('[apiPrefix] required');
    }

    const api = new ApiClient({ prefix: apiPrefix });

    return {
        apiClient: api,
        login: new LoginAPI({ apiClient: api }),
        tasks: new TasksAPI({ apiClient: api }),
    };
}
