import axios from 'axios';

export class Products {
    url: string;
    constructor(url: string) {
        this.url = `${url}/products`;
    }

    public updateRating(id: string, userId: string, rating: number) {
        return axios.patch(this.url + `/${id}/rating`, {
            data: {
                user: userId,
                rating: rating,
            },
        });
    }

    public getAllProducts() {
        return axios.get(this.url + '/');
    }
}
