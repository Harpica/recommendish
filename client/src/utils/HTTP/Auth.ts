import axios from 'axios';
import ServerInterface from './Api';

export class Auth extends ServerInterface {
    constructor() {
        super('auth');
    }

    authUser() {
        return axios.get(`${this.url}`);
    }

    loginUser(login: string, password: string) {
        const query = this.getQueryString([
            { key: 'login', value: login },
            { key: 'password', value: password },
        ]);

        return axios.post(`${this.url}/local?${query}`);
    }

    registerUser(name: string, login: string, password: string) {
        const query = this.getQueryString([
            { key: 'name', value: name },
            { key: 'login', value: login },
            { key: 'password', value: password },
        ]);

        return axios.post(`${this.url}/register?${query}`);
    }

    logOut() {
        return axios.get(`${this.url}/logout`);
    }
}
