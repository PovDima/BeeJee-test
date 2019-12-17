import Base from './Base';

export default class MessagesAPI extends Base {
    getMessages(params) {
        return this.apiClient.get(``, params);
    }
    createMessage(data) {
        return this.apiClient.post(`/create`, data)
    }
    updageMessage(id, data) {
        return this.apiClient.post(`/edit/${id}`, data)
    }
}
//?developer=admin
