import { observer } from 'mobx-react-lite';
import Popup from '../layouts/Popup';
import { useTranslation } from 'react-i18next';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { SERVER_URL } from '../../utils/constants';
import { useRef } from 'react';

interface LoginProps {
    closePopup: () => void;
    loginIsOpen: boolean;
}

const Login: React.FC<LoginProps> = observer(({ closePopup, loginIsOpen }) => {
    const { t } = useTranslation();
    const linkBase = useRef(
        SERVER_URL.replace('http:', '').replace('https:', '')
    );

    return (
        <Popup isOpen={loginIsOpen} closePopup={closePopup}>
            <h2 className='font-bold text-2xl self-center mb-5'>
                {t('partials.login.header')}
            </h2>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <a
                    href={`${linkBase.current}/auth/github/`}
                    className='flex flex-row gap-3 text-lg font-bold rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                >
                    <GitHubIcon />
                    <p>{t('partials.login.logInWithGithub')}</p>
                </a>
                <a
                    href={`${linkBase.current}/auth/vkontakte/`}
                    className='flex flex-row gap-3 text-lg font-bold rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                >
                    <p>{t('partials.login.logInWithVK')}</p>
                </a>
                <a
                    href={`${linkBase.current}/auth/twitter/`}
                    className='flex flex-row gap-3 text-lg font-bold rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                >
                    <TwitterIcon />
                    <p>{t('partials.login.logInWithTwitter')}</p>
                </a>
            </div>
        </Popup>
    );
});
export default Login;
