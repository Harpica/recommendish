import axios from 'axios';
import { Theme, UserRole, UserStatus } from '../types';

export class Users {
    url: string;
    constructor(url: string) {
        this.url = `${url}/users`;
    }

    getUsers() {
        return axios.get(this.url);
    }

    reauthUser() {
        return axios.get(this.url + '/reauth');
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

    authWithGithub() {
        return axios.get(`${this.url}/aith/github`);
    }

    getUserRecommendations(id: string) {
        return axios.get(`${this.url}/${id}/recommendations`);
    }

    // deleteUsers(ids: Array<number>) {
    //     return axios.delete(`http://${BASE_URL}:5000/users`, {
    //         data: {
    //             ids: ids,
    //         },
    //     });
    // }

    changeUsersStatus(ids: Array<unknown>, status: UserStatus) {
        return axios.patch(`${this.url}/status`, {
            data: {
                ids: ids,
                status: status,
            },
        });
    }
    changeUsersRole(ids: Array<unknown>, role: UserRole) {
        return axios.patch(`${this.url}/role`, {
            data: {
                ids: ids,
                role: role,
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
