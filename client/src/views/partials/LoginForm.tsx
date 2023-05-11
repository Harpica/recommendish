import TextInput from '../UI/TextInput';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import Joi from 'joi';
import i18n from '../../localization/i18n';
import { observer } from 'mobx-react-lite';

interface LoginFormProps {
    handleSuccessValidation: (data: { [x: string]: any }) => void;
    errorMessage: string;
}

const LoginSchema = Joi.object({
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

const LoginForm: React.FC<LoginFormProps> = observer(
    ({ handleSuccessValidation, errorMessage }) => {
        const { t } = useTranslation();

        const { control, handleSubmit } = useForm<{ [x: string]: any }>({
            mode: 'onBlur',
            resolver: joiResolver(LoginSchema),
            defaultValues: {
                login: '',
                password: '',
            },
        });

        return (
            <form
                className='flex flex-col gap-4 justify-center items-stretch font-bold'
                onSubmit={handleSubmit((data) => handleSuccessValidation(data))}
            >
                <p className='text-amber-600 text-center'>{errorMessage}</p>
                <TextInput control={control} name='login' placeholder='Login' />
                <TextInput
                    control={control}
                    name='password'
                    placeholder='Password'
                    type='password'
                />
                <button
                    className='self-center rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-400 shadow-md text-lg '
                    type='submit'
                    aria-label='log in'
                >
                    {t('partials.nav.logIn')}
                </button>
            </form>
        );
    }
);

export default LoginForm;
