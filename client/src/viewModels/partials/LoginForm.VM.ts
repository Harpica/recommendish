import { api } from '../../utils/utils';
import { CurrentUser } from '../../utils/types';
import { SERVER_URL } from '../../utils/constants';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

export class LoginVM {
    public state: 'login' | 'register' = 'login';
    private api = api;
    private closePopup: () => void;
    private setCurrentUser: (value: CurrentUser) => void;
    private setIsAuth: (value: boolean) => void;
    public linkBase = SERVER_URL.replace('http:', '').replace('https:', '');
    public errorMessage: string = '';
    constructor(
        closePopup: () => void,
        setCurrentUser: (value: CurrentUser) => void,
        setIsAuth: (value: boolean) => void
    ) {
        this.closePopup = closePopup;
        this.setCurrentUser = setCurrentUser;
        this.setIsAuth = setIsAuth;
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        makeAutoObservable(this);
    }

    setState(state: 'login' | 'register') {
        this.state = state;
    }

    public handleLogin(data: { [x: string]: string }) {
        const loginPromise = this.api.auth.loginUser(data.login, data.password);
        this.handleAuthRequest(loginPromise);
    }

    public handleRegistration(data: { [x: string]: string }) {
        const registrationPromise = this.api.auth.registerUser(
            data.name,
            data.login,
            data.password
        );
        this.handleAuthRequest(registrationPromise);
    }

    private handleAuthRequest(promise: Promise<AxiosResponse<any, any>>) {
        this.errorMessage = '';
        promise
            .then((response) => {
                this.setIsAuth(true);
                this.setCurrentUser(response.data.user);
                this.closePopup();
            })
            .catch((err) => {
                this.errorMessage = err.response.data.message;
                console.log(err);
            });
    }
}
