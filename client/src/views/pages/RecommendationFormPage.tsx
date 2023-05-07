import { useForm } from 'react-hook-form';
import NewRecommendationFielset from '../partials/RecommendationFieldset';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useMemo } from 'react';
import { RecommendationFormVM } from '../../viewModels/pages/RecommendationForm.VM';
import { observer } from 'mobx-react-lite';
import { CurrentUser } from '../../utils/types';
import { useTranslation } from 'react-i18next';

interface RecommendationFormPageProps {
    type: 'new' | 'edit';
    user: CurrentUser;
}

const RecommendationFormPage: React.FC<RecommendationFormPageProps> = observer(
    ({ user, type }) => {
        const params = useParams();
        const navigate = useNavigate();
        const { t } = useTranslation();

        const vm = useMemo(() => {
            return new RecommendationFormVM(navigate, user, type, params.id);
        }, [params, navigate, user, type]);

        const {
            watch,
            reset,
            control,
            handleSubmit,
            formState: { errors },
        } = useForm({
            mode: 'onChange',
            defaultValues: vm.hookFormDefaultValues as { [x: string]: any },
            resolver: joiResolver(vm.recommendationSchema),
        });

        useEffect(() => {
            reset({ ...vm.hookFormDefaultValues });
        }, [vm.hookFormDefaultValues, reset]);

        const watchGroup = watch('group', '');

        return (
            <main className='flex flex-col gap-8'>
                <section className='flex flex-col gap-3'>
                    <form
                        autoComplete='off'
                        onSubmit={handleSubmit(
                            (data) => vm.onValidationSuccess(data, type),
                            () => vm.onValidationFailure(errors)
                        )}
                    >
                        <div className='flex flex-row gap-3 items-center justify-between'>
                            <h1 className='text-2xl font-bold w-fit mb-5 uppercase '>
                                {type === 'new'
                                    ? t('pages.recommendationForm.titleNew')
                                    : t('pages.recommendationForm.titleEdit')}
                            </h1>
                            <button
                                type='submit'
                                className='rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-500 shadow-md'
                                aria-label='send comment'
                            >
                                {t('pages.recommendationForm.send')}
                            </button>
                        </div>

                        <NewRecommendationFielset
                            errors={errors}
                            control={control}
                            groupInputValue={watchGroup}
                            images={vm.images}
                            handleFileUpload={vm.handleFileUpload}
                            handleImageDelete={vm.deleteImage}
                        />
                    </form>
                </section>
            </main>
        );
    }
);

export default RecommendationFormPage;
