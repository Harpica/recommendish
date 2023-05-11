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

        const vm = useMemo(
            () => new RecommendationFormVM(navigate, user._id, type, params.id),
            [navigate, user._id, type, params.id]
        );

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
                        <div className='flex flex-row items-center justify-between gap-3'>
                            <h1 className='mb-5 w-fit text-2xl font-bold uppercase '>
                                {type === 'new'
                                    ? t('pages.recommendationForm.titleNew')
                                    : t('pages.recommendationForm.titleEdit')}
                            </h1>
                            <button
                                type='submit'
                                className='rounded-full border-[1px] border-current p-2 pl-5 pr-5 shadow-md hover:bg-amber-500'
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
