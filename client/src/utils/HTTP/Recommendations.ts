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
                `${curr.key}=${encodeURIComponent(curr.value)}${
                    i === arr.length - 1 ? '' : '&'
                }`
            );
        }, '');
        return axios.get(this.url + '/search' + `?${query}`);
    }

    getRecommendationById(id: string) {
        return axios.get(this.url + `/${id}`);
    }

    likeRecommendation(userId: string, id: string) {
        return axios.patch(this.url + `/${id}/like`, {
            data: {
                user: userId,
            },
        });
    }

    dislikeRecommendation(userId: string, id: string) {
        return axios.patch(this.url + `/${id}/dislike`, {
            data: {
                user: userId,
            },
        });
    }
}