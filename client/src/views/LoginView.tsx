import { LoginSocialGithub, IResolveParams } from 'reactjs-social-login';
import { GithubLoginButton } from 'react-social-login-buttons';
import { BASE_URL, CLIENT_PORT } from '../utils/constants';

const LoginView = () => {
    return (
        <div>
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
                    // setProvider(provider);
                    // setProfile(data);
                    console.log('provider', provider);
                    console.log('data', data);
                }}
                onReject={(err: any) => {
                    console.log(err);
                }}
            >
                <GithubLoginButton />
            </LoginSocialGithub>
        </div>
    );
};

export default LoginView;
