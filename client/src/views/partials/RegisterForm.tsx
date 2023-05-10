import TextInput from '../UI/TextInput';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const RegisterForm = () => {
    const { control, handleSubmit } = useForm({
        mode: 'onChange',
        // resolver: joiResolver(vm.recommendationSchema),
    });
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <form className='flex flex-col gap-4 justify-center font-bold'>
            <TextInput control={control} name='name' placeholder='Your name' />
            <TextInput control={control} name='login' placeholder='Login' />
            <TextInput
                control={control}
                name='password'
                placeholder='Password'
            />
            <button
                className='self-center rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md'
                type='button'
                aria-label='Register'
                onClick={(e) => {}}
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
