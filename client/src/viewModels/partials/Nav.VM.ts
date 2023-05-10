import { action, makeAutoObservable } from 'mobx';
import { CurrentUser, Language, Theme } from '../../utils/types';
import { DEFAULT_USER, root } from '../../utils/constants';
import { api } from '../../utils/utils';
import i18n from '../../localization/i18n';

export class NavVM {
    private api = api;
    private isAuth: boolean;
    private setIsAuth: (value: boolean) => void;
    public loginIsOpen: boolean = false;
    private currentUser: CurrentUser;
    private adminUser: CurrentUser;
    private setCurrentUser: (value: CurrentUser) => void;
    private setAdminUser: () => void;
    public theme: Theme;
    public language: Language;
    public menuIsOpen: boolean = window.innerWidth >= 768 ? true : false;
    public isAdminActsAsOtherUser: boolean;
    constructor(
        isAuth: boolean,
        setIsAuth: (value: boolean) => void,
        currentUser: CurrentUser,
        setCurrentUser: (value: CurrentUser) => void,
        adminUser: CurrentUser,
        setAdminUser: () => void
    ) {
        this.isAuth = isAuth;
        this.setIsAuth = setIsAuth;
        this.currentUser = currentUser;
        this.adminUser = adminUser;
        this.setCurrentUser = setCurrentUser;
        this.setAdminUser = setAdminUser;
        this.openLoginPopup = this.openLoginPopup.bind(this);
        this.closeLoginPopup = this.closeLoginPopup.bind(this);
        this.language = currentUser.language;
        this.theme = currentUser.theme;
        console.log(this.theme);
        console.log(this.currentUser);
        this.isAdminActsAsOtherUser = this.checkIfAdminActsAsOtherUser();
        this.setRootTheme();
        makeAutoObservable(this);
    }

    public openLoginPopup() {
        this.loginIsOpen = true;
    }

    public closeLoginPopup() {
        this.loginIsOpen = false;
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
            this.setUserLanguage(language);
        }
    }

    public setLanguage(language: Language) {
        i18n.changeLanguage(language).then(
            action(() => (this.language = language))
        );
    }

    private setUserLanguage(language: Language) {
        this.api.users
            .changeUserLanguage(this.currentUser._id, language)
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
        this.isAdminActsAsOtherUser = false;
        this.setCurrentUser(this.adminUser!);
        this.setAdminUser();
    }

    private checkIfAdminActsAsOtherUser() {
        return this.adminUser._id !== this.currentUser._id &&
            this.adminUser.role === 'admin'
            ? true
            : false;
    }
}
