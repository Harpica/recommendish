import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import { CurrentUser } from '../../utils/types';

export class UserTableVM {
    private currentUser: CurrentUser;
    private api: Api = api;
    public users: Array<CurrentUser> = [];
    constructor(user: CurrentUser) {
        this.currentUser = user;
        this.getUserRecommendation();
        makeAutoObservable(this);
    }
    private getUserRecommendation() {
        if (this.currentUser.role === 'admin') {
            this.api.users
                .getUsers()
                .then(action((response) => (this.users = response.data.users)))
                .catch((err) => console.log(err));
        }
    }
}
