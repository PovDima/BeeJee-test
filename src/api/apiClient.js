export default class ApiClient {
    constructor({ prefix = 'api/v1' } = {}) {
        this.prefix = prefix;
    }

    get(requestUrl, params) {
        return this.request({
            url: requestUrl,
            method: 'GET',
            params
        });
    }

    post(requestUrl, body = {}, params) {
        return this.request({
            url: requestUrl,
            method: 'POST',
            type: 'test',
            body,
            params
        });
    }

    put(requestUrl, body = {}, params) {
        return this.request({
            url: requestUrl,
            method: 'PUT',
            body,
            params
        });
    }

    delete(requestUrl, body = {}, params) {
        return this.request({
            url: `${requestUrl}`,
            method: 'DELETE',
            body,
            params
        });
    }

    patch(requestUrl, body = {}, params) {
        return this.request({
            url: `${requestUrl}`,
            method: 'PATCH',
            body,
            params
        });
    }

    getFormData(data) {
        const formData = new FormData();
        const token = localStorage.getItem('token');
        
        for (const name in data) {
            formData.append(name, data[name]);
        }

        formData.append('token', token);

        return formData;
    }

    async request({ url, method, body, isFormData, headers, signal, type, params }) {
        const init = {
            method,
            headers: headers || {
                //...(!type ? { 'Content-Type': 'application/json' } : {}),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            signal
        };

        if (body) {
            init.body = this.getFormData(body);
        }

        let newParams = '';

        if (params) {
            for (const param in params) {
                newParams = `${newParams}&&${param}=${params[param]}`
            }
        }

        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/${this.prefix}${url}${newParams}`, init);
            const data = await response.json();

            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }

            if (data && data.status === 'ok') {
                return data;
            }

            throw data.message;
        } catch (err) {
            console.warn('Unhandled exeption');
            console.warn(err);
            throw err;
        }
    }
}
