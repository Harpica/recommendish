import { action, makeAutoObservable } from 'mobx';
import { CurrentUser, Language, Theme } from '../../utils/types';
import { DEFAULT_USER, root } from '../../utils/constants';
import { Api } from '../../utils/HTTP/Api';
import i18n from '../../localization/i18n';

export class NavVM {
    private api: Api;
    private isAuth: boolean;
    private setIsAuth: (value: boolean) => void;
    public loginIsOpen: boolean = false;
    private currentUser: CurrentUser;
    private adminUser: CurrentUser;
    private setCurrentUser: (value: CurrentUser) => void;
    private setAdminUser: (value: CurrentUser) => void;
    public theme: Theme;
    public language: Language = 'en';
    public menuIsOpen: boolean = window.innerWidth >= 768 ? true : false;
    constructor(
        api: Api,
        isAuth: boolean,
        setIsAuth: (value: boolean) => void,
        currentUser: CurrentUser,
        setCurrentUser: (value: CurrentUser) => void,
        adminUser: CurrentUser,
        setAdminUser: (value: CurrentUser) => void
    ) {
        this.api = api;
        this.isAuth = isAuth;
        this.setIsAuth = setIsAuth;
        this.currentUser = currentUser;
        this.adminUser = adminUser;
        this.setCurrentUser = setCurrentUser;
        this.setAdminUser = setAdminUser;
        this.toggleLoginIsOpen = this.toggleLoginIsOpen.bind(this);
        this.theme = this.currentUser.theme;
        this.setRootTheme();
        makeAutoObservable(this);
    }

    public toggleLoginIsOpen() {
        this.loginIsOpen = !this.loginIsOpen;
    }
    public changeTheme(theme: Theme) {
        this.setTheme(theme);
        if (this.isAuth) {
            this.setUserTheme();
        }
    }
    public changeLanguage(language: Language) {
        this.setLanguage(language);
        if (this.isAuth) {
            this.setUserLanguage();
        }
    }

    public setLanguage(language: Language) {
        i18n.changeLanguage(language).then(
            action(() => (this.language = language))
        );
    }

    private setUserLanguage() {
        this.api.users
            .changeUserLanguage(this.currentUser._id, this.language)
            .then(() =>
                this.setCurrentUser({
                    ...this.currentUser,
                    language: this.language,
                })
            )
            .catch((err) => console.log(err));
    }

    private setTheme(theme: Theme) {
        this.theme = theme;
        this.setRootTheme();
    }

    private setRootTheme() {
        this.theme === 'dark'
            ? root?.classList.add('dark')
            : root?.classList.remove('dark');
    }

    private setUserTheme() {
        this.api.users
            .changeUserTheme(this.currentUser._id, this.theme)
            .then(() =>
                this.setCurrentUser({ ...this.currentUser, theme: this.theme })
            )
            .catch((err) => console.log(err));
    }

    public toggleMenu() {
        this.menuIsOpen = !this.menuIsOpen;
    }

    public logOut() {
        this.api.auth
            .logOut()
            .catch((err) => console.log(err))
            .finally(() => {
                this.setIsAuth(false);
                this.setCurrentUser(DEFAULT_USER);
            });
    }

    public returnToAdminUser() {
        this.setCurrentUser(this.adminUser!);
        this.setAdminUser(DEFAULT_USER);
    }

    public isAdminActsAsOtherUser() {
        return this.adminUser.role === 'admin' ? true : false;
    }
}
