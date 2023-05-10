import { action, makeAutoObservable } from 'mobx';
import { CurrentUser } from '../utils/types';
import { DEFAULT_USER } from '../utils/constants';
import { api } from '../utils/utils';

export class AppVM {
    public isAuth: boolean;
    public currentUser: CurrentUser;
    public adminUser: CurrentUser = DEFAULT_USER;
    public isLoading: boolean = false;
    private api = api;
    constructor() {
        this.currentUser = DEFAULT_USER;
        this.isAuth = false;
        this.setIsAuth = this.setIsAuth.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.setAdminUser = this.setAdminUser.bind(this);
        this.authUser();
        makeAutoObservable(this);
    }

    public setCurrentUser(user: CurrentUser) {
        this.currentUser = user;
    }

    public setAdminUser() {
        this.adminUser = this.currentUser;
    }

    public setIsAuth(value: boolean) {
        this.isAuth = value;
    }

    public authUser() {
        this.isLoading = true;
        this.api.auth
            .authUser()
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
