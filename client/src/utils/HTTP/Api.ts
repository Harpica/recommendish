import axios from 'axios';
import { Users } from './Users';
import { BASE_URL, SERVER_PORT } from '../constants';
import { Tags } from './Tags';
import { Recommendations } from './Recommendations';
import { Products } from './Products';
import { Comments } from './Comments';

axios.defaults.withCredentials = true;

export class Api {
    private url: string;
    public users: Users;
    public tags: Tags;
    public recommendations: Recommendations;
    public products: Products;
    public comments: Comments;
    constructor() {
        this.url = `http://${BASE_URL}:${SERVER_PORT}`;
        this.users = new Users(this.url);
        this.tags = new Tags(this.url);
        this.recommendations = new Recommendations(this.url);
        this.products = new Products(this.url);
        this.comments = new Comments(this.url);
    }
}

export const api = new Api();
