import { action, makeAutoObservable, makeObservable } from 'mobx';
import { CurrentUser, Recommendation } from '../utils/types';
import { DEFAULT_USER, DEFAULT_RECOMMENDATION } from '../utils/constants';

export class AppVM {
    public isAuth: boolean;
    public currentUser: CurrentUser;
    constructor() {
        this.currentUser = DEFAULT_USER;
        this.isAuth = true;
        this.setIsAuth = this.setIsAuth.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        makeAutoObservable(this);
    }

    public setCurrentUser(user: CurrentUser) {
        this.currentUser = { ...user };
    }

    public setIsAuth(value: boolean) {
        this.isAuth = value;
    }
}
