import axios from 'axios';

export class Recommendations {
    url: string;
    constructor(url: string) {
        this.url = `${url}/recommendations`;
    }

    getPopularRecommendations() {
        return axios.get(this.url + '/popular');
    }

    getRecentRecommendations() {
        return axios.get(this.url + '/recent');
    }

    getSearchResults(queryParams: Array<{ key: string; value: string }>) {
        const query = queryParams.reduce((prev, curr, i, arr) => {
            return (
                prev +
                `${curr.key}=${curr.value}${i === arr.length - 1 ? '' : '&'}`
            );
        }, '');
        return axios.get(this.url + '/search' + `?${query}`);
    }
}
