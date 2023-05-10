import axios from 'axios';
import { SERVER_URL } from '../constants';

axios.defaults.withCredentials = true;

export default class ServerInterface {
    protected url: string;
    constructor(root: string) {
        this.url = `${SERVER_URL}/${root}`;
    }

    public getQueryString(queryParams: Array<{ key: string; value: string }>) {
        return queryParams.reduce((prev, curr, i, arr) => {
            return (
                prev +
                `${curr.key}=${encodeURIComponent(curr.value)}${
                    i === arr.length - 1 ? '' : '&'
                }`
            );
        }, '');
    }
}
