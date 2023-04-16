import axios from 'axios';
import { Users } from './Users';
import { BASE_URL, SERVER_PORT } from '../constants';

// axios.defaults.withCredentials = true;

export class Api {
    private url: string;
    public users: Users;
    constructor() {
        this.url = `http://${BASE_URL}:${SERVER_PORT}`;
        this.users = new Users(this.url);
    }
}

export const api = new Api();
