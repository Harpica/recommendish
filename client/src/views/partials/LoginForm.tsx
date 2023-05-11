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

const LoginForm: React.FC<LoginFormProps> = observer(
    ({ handleSuccessValidation, errorMessage }) => {
        const { t } = useTranslation();

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
                className='flex flex-col items-stretch justify-center gap-4 font-bold'
                onSubmit={handleSubmit((data) => handleSuccessValidation(data))}
            >
                <p className='text-center text-amber-600'>
                    {errorMessage && t('partials.login.incorrectCredentials')}
                </p>
                <TextInput
                    control={control}
                    name='login'
                    placeholder={t('partials.login.login') ?? 'Login'}
                />
                <TextInput
                    control={control}
                    name='password'
                    placeholder={t('partials.login.password') ?? 'Password'}
                    type='password'
                />
                <button
                    className='self-center rounded-full border-[1px] border-current p-2 pl-5 pr-5 text-lg shadow-md hover:bg-amber-400 '
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
