import { action, makeAutoObservable, makeObservable } from 'mobx';
import { CurrentUser } from '../utils/types';
import { DEFAULT_USER } from '../utils/constants';

export class AppVM {
    public isAuth: boolean;
    public currentUser: CurrentUser;
    constructor() {
        console.log('init');
        this.currentUser = DEFAULT_USER;
        this.isAuth = false;
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
