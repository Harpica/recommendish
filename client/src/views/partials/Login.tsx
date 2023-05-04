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
import { CurrentUser } from '../../utils/types';
import { observer } from 'mobx-react-lite';
import Popup from '../layouts/Popup';
import { useTranslation } from 'react-i18next';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { BASE_URL, SERVER_PORT } from '../../utils/constants';

interface LoginProps {
    currentUser: CurrentUser;
    setCurrentUser: (value: CurrentUser) => void;
    setIsAuth: (value: boolean) => void;
    closePopup: () => void;
    loginIsOpen: boolean;
}

const Login: React.FC<LoginProps> = observer(
    ({ currentUser, setCurrentUser, setIsAuth, closePopup, loginIsOpen }) => {
        // const [vm] = useState(
        //     new LoginVM(api, currentUser, setCurrentUser, setIsAuth, closePopup)
        // );
        const { t } = useTranslation();

        return (
            <Popup isOpen={loginIsOpen} closePopup={closePopup}>
                <h2 className='font-bold text-2xl self-center mb-5'>
                    {t('partials.login.header')}
                </h2>
                <div className='flex flex-col gap-4 justify-center items-center'>
                    <a
                        href={`http://${BASE_URL}:${SERVER_PORT}/auth/github/`}
                        className='flex flex-row gap-3 text-lg font-bold rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                    >
                        <GitHubIcon />
                        <p>Log in with Github</p>
                    </a>
                    <a
                        href={`http://${BASE_URL}:${SERVER_PORT}/auth/twitter/`}
                        className='flex flex-row gap-3 text-lg font-bold rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                    >
                        <TwitterIcon />
                        <p>Log in with Twitter</p>
                    </a>
                </div>
            </Popup>
        );
    }
);
export default Login;
