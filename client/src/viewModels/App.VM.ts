import { action, makeAutoObservable, makeObservable } from 'mobx';
import { CurrentUser, Recommendation } from '../utils/types';
import { DEFAULT_USER, DEFAULT_RECOMMENDATION } from '../utils/constants';
import { Api, api } from '../utils/HTTP/Api';

export class AppVM {
    public isAuth: boolean;
    public currentUser: CurrentUser;
    public isLoading: boolean = false;
    private api: Api = api;
    constructor() {
        this.currentUser = DEFAULT_USER;
        this.isAuth = false;
        this.setIsAuth = this.setIsAuth.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.reauthUser();
        makeAutoObservable(this);
    }

    public setCurrentUser(user: CurrentUser) {
        this.currentUser = { ...user };
    }

    public setIsAuth(value: boolean) {
        this.isAuth = value;
    }

    public reauthUser() {
        this.isLoading = true;
        this.api.users
            .reauthUser()
            .then(
                action((response) => {
                    this.setIsAuth(true);
                    this.setCurrentUser(response.data.user);
                })
            )
            .catch((err) => console.log(err))
            .finally(action(() => (this.isLoading = false)));
    }
}
