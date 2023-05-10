import axios from 'axios';
import { CreateCommentData } from '../types';
import ServerInterface from './Api';

export class Comments extends ServerInterface {
    constructor() {
        super('comments');
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
