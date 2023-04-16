import axios from 'axios';
import { Theme, UserStatus } from '../types';

axios.defaults.withCredentials = true;

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

    changeUserStatus(id: string, status: UserStatus) {
        return axios.patch(`${this.url}/${id}/status`, {
            data: {
                status: status,
            },
        });
    }

    changeUserTheme(id: string, theme: Theme) {
        return axios.patch(`${this.url}/${id}/theme`, {
            data: {
                theme: theme,
            },
        });
    }

    changeUserLanguage(id: string, language: string) {
        return axios.patch(`${this.url}/${id}/language`, {
            data: {
                language: language,
            },
        });
    }
}
