import { getFromLocalStorage } from '../utils/localStorageUtils';


export default class ApiClient {
    constructor({ prefix = 'api/v1' } = {}) {
        this.prefix = prefix;
    }

    get(requestUrl, params) {
        return this.request({
            url   : requestUrl,
            method: 'GET',
            params
        });
    }

    post(requestUrl, body = {}, params) {
        return this.request({
            url   : requestUrl,
            method: 'POST',
            body,
            params
        });
    }

    put(requestUrl, body = {}, params) {
        return this.request({
            url   : requestUrl,
            method: 'PUT',
            body,
            params
        });
    }

    delete(requestUrl, body = {}, params) {
        return this.request({
            url   : `${requestUrl}`,
            method: 'DELETE',
            body,
            params
        });
    }

    patch(requestUrl, body = {}, params) {
        return this.request({
            url   : `${requestUrl}`,
            method: 'PATCH',
            body,
            params
        });
    }

    async request({ url, method, body, isFormData, headers, signal }) {
        const token = getFromLocalStorage('jwt');
        const init = {
            method,
            headers: headers || {
                Accept        : 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Headers': '*',
                ...(token ? { 'X-AuthToken': token } : {})
            },
            signal
        };

        if (body && !isFormData) {
            init.body = JSON.stringify(body);
        } else {
            init.body = body;
        }

        try {
            const response = await fetch(`${this.prefix}${url}`, init);

            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            const data = await response.json();

            if (data && data.status === 1) {
                return data;
            }

            throw data.error;
        } catch (err) {
            console.warn('Unhandled exeption');
            console.warn(err);
            throw err;
        }
    }
}
