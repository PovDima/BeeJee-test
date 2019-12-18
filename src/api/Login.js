import Base from './Base';

export default class LoginAPI extends Base {
  login(data) {
    return this.apiClient.post('login?developer=admin', data);
  }
}
