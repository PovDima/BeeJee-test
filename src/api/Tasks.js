import Base from './Base';

export default class TasksAPI extends Base {
    getTasks(params) {
        return this.apiClient.get(`?developer=admin`, params);
    }

    createTask(data) {
        return this.apiClient.post(`create?developer=admin`, data)
    }
    
    updateTask(id, data) {
        return this.apiClient.post(`edit/${id}?developer=admin`, data)
    }
}

