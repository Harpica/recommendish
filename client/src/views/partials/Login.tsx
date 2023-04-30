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
import Popup from '../layouts/Popup';

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

        return (
            <Popup isOpen={loginIsOpen} closePopup={closePopup}>
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
            </Popup>
        );
    }
);
export default Login;
