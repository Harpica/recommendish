import Joi from 'joi';
import i18n from '../../localization/i18n';
import { api } from '../../utils/utils';
import { CurrentUser } from '../../utils/types';

export class LoginFormVM {
    public loginSchema = Joi.object({
        login: Joi.string()
            .required()
            .min(3)
            .max(40)
            .messages({
                'string.empty': i18n.t('form.errors.required'),
                'string.min': i18n.t('form.errors.minLength', {
                    length: 3,
                }),
                'string.max': i18n.t('form.errors.maxLength', {
                    length: 40,
                }),
            }),
        password: Joi.string()
            .required()
            .min(4)
            .max(40)
            .messages({
                'string.empty': i18n.t('form.errors.required'),
                'string.min': i18n.t('form.errors.minLength', {
                    length: 8,
                }),
                'string.max': i18n.t('form.errors.maxLength', {
                    length: 40,
                }),
            }),
    });
    private api = api;
    private closePopup: () => void;
    private setCurrentUser: (value: CurrentUser) => void;
    private setIsAuth: (value: boolean) => void;
    constructor(
        closePopup: () => void,
        setCurrentUser: (value: CurrentUser) => void,
        setIsAuth: (value: boolean) => void
    ) {
        this.closePopup = closePopup;
        this.setCurrentUser = setCurrentUser;
        this.setIsAuth = setIsAuth;
        this.handleLogin = this.handleLogin.bind(this);
    }

    public handleLogin(data: { [x: string]: string }) {
        this.api.auth
            .loginUser(data.login, data.password)
            .then((response) => {
                this.setIsAuth(true);
                this.setCurrentUser(response.data.user);
                this.closePopup();
            })
            .catch((err) => console.log(err));
    }
}
