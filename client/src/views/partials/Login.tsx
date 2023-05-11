import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Popup from '../layouts/Popup';
import GitHubIcon from '@mui/icons-material/GitHub';
// import TwitterIcon from '@mui/icons-material/Twitter';
import IconVK from '../svgWrappers/IconVK';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { CurrentUser } from '../../utils/types';
import { LoginVM } from '../../viewModels/partials/LoginForm.VM';

interface LoginProps {
    closePopup: () => void;
    loginIsOpen: boolean;
    setCurrentUser: (value: CurrentUser) => void;
    setIsAuth: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = observer(
    ({ closePopup, loginIsOpen, setCurrentUser, setIsAuth }) => {
        const { t } = useTranslation();
        const vm = useMemo(
            () => new LoginVM(closePopup, setCurrentUser, setIsAuth),
            [closePopup, setCurrentUser, setIsAuth]
        );

        return (
            <Popup isOpen={loginIsOpen} closePopup={closePopup}>
                <h2 className='font-bold text-2xl self-center mb-5'>
                    {t('partials.login.header')}
                </h2>
                <div className='flex flex-col gap-4 justify-center items-stretch'>
                    {vm.state === 'login' && (
                        <>
                            <LoginForm
                                handleSuccessValidation={vm.handleLogin}
                                errorMessage={vm.errorMessage}
                            />
                            <button
                                type='button'
                                aria-label='open register form'
                                className='cursor-pointer hover:opacity-50 underline'
                                onClick={() => vm.setState('register')}
                            >
                                Register
                            </button>
                        </>
                    )}
                    {vm.state === 'register' && (
                        <>
                            <RegisterForm
                                handleSuccessValidation={vm.handleRegistration}
                                errorMessage={vm.errorMessage}
                            />
                            <button
                                type='button'
                                aria-label='open login form'
                                className='cursor-pointer hover:opacity-50 underline'
                                onClick={() => vm.setState('login')}
                            >
                                Log in
                            </button>
                        </>
                    )}
                    <a
                        href={`${vm.linkBase}/auth/github/`}
                        className='flex flex-row gap-3 items-center text-lg font-bold rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                    >
                        <GitHubIcon />
                        <p>{t('partials.login.logInWithGithub')}</p>
                    </a>
                    <a
                        href={`${vm.linkBase}/auth/vkontakte/`}
                        className='flex flex-row gap-3 items-center text-lg font-bold rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md min-w-[235px]'
                    >
                        <IconVK />
                        <p>{t('partials.login.logInWithVK')}</p>
                    </a>

                    {/* Twitter login works only in develop mode because VDS with deployed production is located in russia where twitter is banned :/ */}

                    {/* <a
                    href={`${vm.linkBase}/auth/twitter/`}
                    className='flex flex-row gap-3 items-center text-lg font-bold rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                >
                    <TwitterIcon />
                    <p>{t('partials.login.logInWithTwitter')}</p>
                </a> */}
                </div>
            </Popup>
        );
    }
);
export default Login;
