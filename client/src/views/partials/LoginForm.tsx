import TextInput from '../UI/TextInput';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { LoginFormVM } from '../../viewModels/partials/LoginForm.VM';
import { CurrentUser } from '../../utils/types';

interface LoginFormProps {
    closePopup: () => void;
    setCurrentUser: (value: CurrentUser) => void;
    setIsAuth: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
    closePopup,
    setCurrentUser,
    setIsAuth,
}) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const vm = useMemo(
        () => new LoginFormVM(closePopup, setCurrentUser, setIsAuth),
        [closePopup]
    );
    const { control, handleSubmit } = useForm<{ [x: string]: any }>({
        mode: 'onBlur',
        resolver: joiResolver(vm.loginSchema),
        defaultValues: {
            login: '',
            password: '',
        },
    });

    return (
        <form
            className='flex flex-col gap-4 justify-center font-bold'
            onSubmit={handleSubmit((data) => vm.handleLogin(data))}
        >
            <TextInput control={control} name='login' placeholder='Login' />
            <TextInput
                control={control}
                name='password'
                placeholder='Password'
            />
            <button
                className='self-center rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                type='submit'
                aria-label='log in'
                onClick={(e) => {}}
            >
                {t('partials.nav.logIn')}
            </button>
        </form>
    );
};

export default LoginForm;
