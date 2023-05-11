import TextInput from '../UI/TextInput';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import Joi from 'joi';
import i18n from '../../localization/i18n';
import { observer } from 'mobx-react-lite';

interface RegisterFormProps {
    handleSuccessValidation: (data: { [x: string]: any }) => void;
    errorMessage: string;
}

const RegisterForm: React.FC<RegisterFormProps> = observer(
    ({ handleSuccessValidation, errorMessage }) => {
        const RegistrationSchema = Joi.object({
            name: Joi.string()
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
        const { control, handleSubmit } = useForm({
            mode: 'onBlur',
            resolver: joiResolver(RegistrationSchema),
        });
        const { t } = useTranslation();
        return (
            <form
                className='flex flex-col items-stretch justify-center gap-4 font-bold'
                onSubmit={handleSubmit((data) => handleSuccessValidation(data))}
            >
                <p className='text-center text-amber-600'>
                    {errorMessage && t('partials.login.error')}
                </p>
                <TextInput
                    control={control}
                    name='name'
                    placeholder={t('partials.login.name') ?? 'Your name'}
                />
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
                    className='self-center rounded-full border-[1px] border-current p-2 pl-5 pr-5 text-lg shadow-md hover:bg-amber-400'
                    type='submit'
                    aria-label='Register'
                >
                    {t('partials.login.register')}
                </button>
            </form>
        );
    }
);

export default RegisterForm;
