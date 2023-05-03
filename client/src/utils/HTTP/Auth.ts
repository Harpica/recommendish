import axios from 'axios';

export class Auth {
    url: string;
    constructor(url: string) {
        this.url = `${url}/auth`;
    }

    authUser() {
        return axios.get(`${this.url}`);
    }

    logOut() {
        return axios.get(`${this.url}/logout`);
    }
}
