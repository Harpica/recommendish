import { Control, useForm } from 'react-hook-form';
import NewRecommendationFielset from '../partials/RecommendationFieldset';
import { joiResolver } from '@hookform/resolvers/joi';

import { useParams } from 'react-router';
import { DEFAULT_RECOMMENDATION } from '../../utils/constants';
import { useEffect, useMemo } from 'react';
import { RecommendationFormVM } from '../../viewModels/pages/RecommendationForm.VM';
import { observer } from 'mobx-react-lite';
import { CurrentUser } from '../../utils/types';

interface RecommendationFormPageProps {
    type: 'new' | 'edit';
    user: CurrentUser;
}

const RecommendationFormPage: React.FC<RecommendationFormPageProps> = observer(
    ({ user, type }) => {
        console.log('rerender');
        const params = useParams();
        const vm = useMemo(
            () => new RecommendationFormVM(user, type, params.id),
            [params]
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
        }, [vm.hookFormDefaultValues]);

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
                                    ? 'Create new recommendation'
                                    : 'Edit recommendation'}
                            </h1>
                            <button
                                type='submit'
                                className='rounded-full p-2 pr-5 pl-5 border-inherit border-[1px] hover:bg-amber-500 shadow-md'
                                aria-label='send comment'
                            >
                                Send
                            </button>
                        </div>
                        <NewRecommendationFielset
                            control={control}
                            groupInputValue={watchGroup}
                        />
                    </form>
                </section>
            </main>
        );
    }
);

export default RecommendationFormPage;
