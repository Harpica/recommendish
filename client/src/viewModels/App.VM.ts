import { action, makeAutoObservable, makeObservable } from 'mobx';
import { CurrentUser } from '../utils/types';
import { DEFAULT_USER } from '../utils/constants';

export class AppVM {
    public isAuth: boolean = true;
    public currentUser: CurrentUser;
    constructor() {
        this.currentUser = DEFAULT_USER;
        makeAutoObservable(this);
    }
    public setCurrentUser(user: CurrentUser) {
        this.currentUser = user;
    }
    public setIsAuth(value: boolean) {
        this.isAuth = value;
    }
}
