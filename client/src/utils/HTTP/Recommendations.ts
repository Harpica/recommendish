import axios from 'axios';
import { RecommendationCreateOrEditData } from '../types';
import ServerInterface from './Api';

export class Recommendations extends ServerInterface {
    constructor() {
        super('recommendations');
    }

    getPopularRecommendations() {
        return axios.get(this.url + '/popular');
    }

    getRecentRecommendations() {
        return axios.get(this.url + '/recent');
    }

    getSearchResults(queryParams: Array<{ key: string; value: string }>) {
        const query = this.getQueryString(queryParams);
        return axios.get(`${this.url}/search?${query}`);
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

    createRecommendation(recommendationData: RecommendationCreateOrEditData) {
        return axios.post(this.url, {
            data: {
                recommendation: recommendationData,
            },
        });
    }

    updateRecommendation(
        id: string,
        recommendationData: RecommendationCreateOrEditData
    ) {
        return axios.put(this.url + `/${id}`, {
            data: {
                recommendation: recommendationData,
            },
        });
    }

    deleteRecommendation(id: string) {
        return axios.delete(this.url + `/${id}`);
    }
}
