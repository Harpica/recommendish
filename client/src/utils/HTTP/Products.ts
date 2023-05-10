import axios from 'axios';
import ServerInterface from './Api';

export class Products extends ServerInterface {
    constructor() {
        super('products');
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
