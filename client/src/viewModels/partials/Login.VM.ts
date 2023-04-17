import { action, makeAutoObservable } from 'mobx';
import { BASE_URL, CLIENT_PORT } from '../../utils/constants';
import { Api } from '../../utils/HTTP/Api';
import { IResolveParams, objectType } from 'reactjs-social-login';
import { CurrentUser } from '../../utils/types';

export class LoginVM {
    private provider: string = '';
    public redirectUrl: string = `http://${BASE_URL}:${CLIENT_PORT}`;
    public githubId: string = process.env.REACT_APP_SOCIALS_GITHUB_ID || '';
    public githubSecret: string =
        process.env.REACT_APP_SOCIALS_GITHUB_SECRET || '';
    public twitterId: string = process.env.REACT_APP_SOCIALS_TWITTER_ID || '';
    private api: Api;
    private currentUser: CurrentUser;
    private setCurrentUser: (value: CurrentUser) => void;
    private setIsAuth: (value: boolean) => void;
    public closePopup: () => void;

    constructor(
        api: Api,
        currentUser: CurrentUser,
        setCurrentUser: (value: CurrentUser) => void,
        setIsAuth: (value: boolean) => void,
        closePopup: () => void
    ) {
        this.api = api;
        this.currentUser = currentUser;
        this.setCurrentUser = setCurrentUser;
        this.setIsAuth = setIsAuth;
        this.closePopup = closePopup;
        this.handleLogin = this.handleLogin.bind(this);
        makeAutoObservable(this);
    }

    handleLogin({ provider, data }: IResolveParams) {
        console.log('provider, data', provider, data);
        this.setProvider(provider);
        if (data) {
            this.handleData(data);
        }
    }

    private setProvider(value: string) {
        this.provider = value;
    }

    private handleData(data: objectType) {
        let login: string;
        let avatar = '';
        if (this.provider === 'twitter') {
            login = data.username;
            avatar = data.profile_image_url;
        } else {
            login = data.login;
            avatar = data.avatar_url;
        }
        this.authUser(login, data.name, avatar);
    }

    private authUser(login: string, name: string, avatar: string) {
        this.api.users
            .authUser(login, name)
            .then((data) => {
                console.log(data.data);
                this.setCurrentUser(data.data.user);
                this.setIsAuth(true);
                this.closePopup();
            })
            .catch((err) => console.log(err));
    }
}
