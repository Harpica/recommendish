import axios from 'axios';
import ServerInterface from './Api';

export class Images extends ServerInterface {
    constructor() {
        super('images');
    }

    uploadImage(image: any) {
        return axios.post(
            this.url,
            {
                data: {
                    image: image,
                },
            },
            {
                headers: {
                    'Content-type': 'application/json',
                },
            }
        );
    }

    deleteImage(id: string) {
        return axios.delete(this.url + `/${id.replace('recommendish/', '')}`);
    }
}
