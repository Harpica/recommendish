import axios from 'axios';
import { CreateCommentData } from '../types';

export class Comments {
    url: string;
    constructor(url: string) {
        this.url = `${url}/comments`;
    }

    getLatest(id: string, lastUpdate: string) {
        return axios.get(`${this.url}/latest?id=${id}&date=${lastUpdate}`);
    }
    getAll(id: string) {
        return axios.get(`${this.url}/?id=${id}`);
    }

    createComment(commentData: CreateCommentData) {
        return axios.post(`${this.url}/create`, {
            data: {
                comment: commentData,
            },
        });
    }
}
