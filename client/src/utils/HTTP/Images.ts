import axios from 'axios';

export class Images {
    url: string;
    constructor(url: string) {
        this.url = `${url}/images`;
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
