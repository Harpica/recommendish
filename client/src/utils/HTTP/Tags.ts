import axios from 'axios';
import ServerInterface from './Api';

export class Tags extends ServerInterface {
    constructor() {
        super('tags');
    }

    getPopularTags() {
        return axios.get(this.url + '/popular');
    }

    getAllTags() {
        return axios.get(this.url + '/');
    }
}
