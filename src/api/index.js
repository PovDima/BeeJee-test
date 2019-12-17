import ApiClient from './apiClient';
import MessagesAPI from './Messages';

export default function ({ apiPrefix } = {}) {
    if (!apiPrefix) {
        throw new Error('[apiPrefix] required');
    }

    const api = new ApiClient({ prefix: apiPrefix });

    return {
        apiClient: api,
        messages: new MessagesAPI({ apiClient: api }),
    };
}
