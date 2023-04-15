import axios from 'axios';
import { UserStatus } from '../types';

export class Users {
    url: string;
    constructor(url: string) {
        this.url = `${url}/users`;
    }

    getUsers() {
        return axios.get(this.url);
    }

    authUser(login: string, name: string, avatar?: string) {
        return axios.post(`${this.url}/auth`, {
            data: {
                login: login,
                name: name,
                avatar: avatar,
            },
        });
    }

    getUser(id: string) {
        return axios.get(`${this.url}/${id}`);
    }

    // deleteUsers(ids: Array<number>) {
    //     return axios.delete(`http://${BASE_URL}:5000/users`, {
    //         data: {
    //             ids: ids,
    //         },
    //     });
    // }

    changeUsersStatus(id: string, status: UserStatus) {
        return axios.patch(`${this.url}/${id}/status`, {
            data: {
                status: status,
            },
        });
    }
}
