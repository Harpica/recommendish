import { action, makeAutoObservable } from 'mobx';
import { CurrentUser } from '../utils/types';

export class NavVM {
    private isAuth: boolean;
    private setIsAuth: (value: boolean) => void;
    public loginIsOpen: boolean = false;
    private setCurrentUser: (value: CurrentUser) => void;
    constructor(
        isAuth: boolean,
        setIsAuth: (value: boolean) => void,
        setCurrentUser: (value: CurrentUser) => void
    ) {
        this.isAuth = isAuth;
        this.setCurrentUser = setCurrentUser;
        this.setIsAuth = setIsAuth;
        this.toggleLoginIsOpen = this.toggleLoginIsOpen.bind(this);
        makeAutoObservable(this);
    }

    public toggleLoginIsOpen() {
        this.loginIsOpen = !this.loginIsOpen;
    }
}
