import axios from 'axios';

export class Tags {
    url: string;
    constructor(url: string) {
        this.url = `${url}/tags`;
    }

    getPopularTags() {
        return axios.get(this.url + '/popular');
    }

    getAllTags() {
        return axios.get(this.url + '/');
    }
}
