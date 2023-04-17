import {
    LoginSocialGithub,
    IResolveParams,
    LoginSocialTwitter,
} from 'reactjs-social-login';
import {
    GithubLoginButton,
    TwitterLoginButton,
} from 'react-social-login-buttons';
import { useState } from 'react';
import { LoginVM } from '../../viewModels/partials/Login.VM';
import { api } from '../../utils/HTTP/Api';
import { CurrentUser } from '../../utils/types';
import { observer } from 'mobx-react-lite';
import useOutsideClick from '../../utils/hooks/useOutsideClick';

interface LoginProps {
    currentUser: CurrentUser;
    setCurrentUser: (value: CurrentUser) => void;
    setIsAuth: (value: boolean) => void;
    closePopup: () => void;
    loginIsOpen: boolean;
}

const Login: React.FC<LoginProps> = observer(
    ({ currentUser, setCurrentUser, setIsAuth, closePopup, loginIsOpen }) => {
        const [vm] = useState(
            new LoginVM(api, currentUser, setCurrentUser, setIsAuth, closePopup)
        );
        const ref = useOutsideClick(closePopup, loginIsOpen);

        return (
            <section
                className={`${
                    loginIsOpen ? 'flex' : 'hidden'
                } absolute top-0 left-0 w-full h-full justify-center items-center bg-black bg-opacity-50 z-10`}
            >
                <div
                    className='bg-slate-50 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100  border-[2px] border-amber-300 flex flex-col rounded shadow-md p-5'
                    ref={ref}
                >
                    <h2 className='font-bold text-2xl self-center mb-5'>
                        Choose how to log in:
                    </h2>
                    <LoginSocialGithub
                        client_id={vm.githubId}
                        client_secret={vm.githubSecret}
                        redirect_uri={vm.redirectUrl}
                        onLoginStart={() => {
                            console.log('start login');
                        }}
                        // onLogoutSuccess={onLogoutSuccess}
                        onResolve={vm.handleLogin}
                        onReject={(err: any) => {
                            console.log(err);
                        }}
                    >
                        <GithubLoginButton />
                    </LoginSocialGithub>
                    <LoginSocialTwitter
                        client_id={vm.twitterId}
                        redirect_uri={vm.redirectUrl}
                        onLoginStart={() => {
                            console.log('start login');
                        }}
                        onResolve={vm.handleLogin}
                        onReject={(err: any) => {
                            console.log(err);
                        }}
                    >
                        <TwitterLoginButton />
                    </LoginSocialTwitter>
                </div>
            </section>
        );
    }
);
export default Login;
