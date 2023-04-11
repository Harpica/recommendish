import {
    LoginSocialGithub,
    IResolveParams,
    LoginSocialTwitter,
} from 'reactjs-social-login';
import {
    GithubLoginButton,
    TwitterLoginButton,
} from 'react-social-login-buttons';
import { BASE_URL, CLIENT_PORT } from '../utils/constants';
import { useState } from 'react';

const LoginView = () => {
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState<any>();
    return (
        <section className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-10'>
            <div className='bg-zinc-100 border-[2px] border-amber-300 flex flex-col rounded shadow-md p-5'>
                <h2 className='font-bold text-2xl self-center mb-5'>
                    Choose how to log in:
                </h2>
                <LoginSocialGithub
                    client_id={process.env.REACT_APP_SOCIALS_GITHUB_ID || ''}
                    client_secret={
                        process.env.REACT_APP_SOCIALS_GITHUB_SECRET || ''
                    }
                    redirect_uri={`http://${BASE_URL}:${CLIENT_PORT}`}
                    onLoginStart={() => {
                        console.log('start login');
                    }}
                    // onLogoutSuccess={onLogoutSuccess}
                    onResolve={({ provider, data }: IResolveParams) => {
                        setProvider(provider);
                        setProfile(data);
                        console.log('provider', provider);
                        console.log('data', data);
                    }}
                    onReject={(err: any) => {
                        console.log(err);
                    }}
                >
                    <GithubLoginButton />
                </LoginSocialGithub>
                <LoginSocialTwitter
                    client_id={process.env.REACT_APP_SOCIALS_TWITTER_ID || ''}
                    redirect_uri={`http://${BASE_URL}:${CLIENT_PORT}`}
                    onLoginStart={() => {
                        console.log('start login');
                    }}
                    onResolve={({ provider, data }: IResolveParams) => {
                        setProvider(provider);
                        setProfile(data);
                        console.log('provider', provider);
                        console.log('data', data);
                    }}
                    onReject={(err: any) => {
                        console.log(err);
                    }}
                >
                    <TwitterLoginButton />
                </LoginSocialTwitter>
            </div>
        </section>
    );
};

export default LoginView;
