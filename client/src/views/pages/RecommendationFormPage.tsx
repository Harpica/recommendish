import { Control, useForm } from 'react-hook-form';
import NewRecommendationFielset from '../partials/NewRecommendationFieldset';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useParams } from 'react-router';
import { DEFAULT_RECOMMENDATION } from '../../utils/constants';
import { useEffect } from 'react';

const recommendationSchema = Joi.object({
    title: Joi.string().min(3).max(40).required(),
    group: Joi.string().required(),
    productTitle: Joi.required(),
    tags: Joi.required(),
    rating: Joi.number().required(),
});

const RecommendationFormPage = () => {
    console.log('rerender');
    const params = useParams();
    const recommendation = DEFAULT_RECOMMENDATION;
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: recommendation.name,
            group: recommendation.group,
            productTitle: 'Title',
            tags: recommendation.tags,
            rating: 8,
        } as { [x: string]: any },
        resolver: joiResolver(recommendationSchema),
    });
    return (
        <main className='flex flex-col gap-8'>
            <section className='flex flex-col gap-3'>
                <form
                    autoComplete='off'
                    onSubmit={handleSubmit(
                        (data) => {
                            console.log('submitted');
                            console.log(data);
                        },
                        () => {
                            console.log('errors', errors);
                        }
                    )}
                >
                    <div className='flex flex-row gap-3 items-center justify-between'>
                        <h1 className='text-2xl font-bold w-fit mb-5 uppercase '>
                            Create new recommendation
                        </h1>
                        <button
                            type='submit'
                            className='rounded-full p-2 pr-5 pl-5 border-inherit border-[1px] hover:bg-amber-500'
                            aria-label='send comment'
                        >
                            Send
                        </button>
                    </div>
                    <NewRecommendationFielset
                        recommendation={recommendation}
                        control={control}
                        errors={errors}
                    />
                </form>
            </section>
        </main>
    );
};

export default RecommendationFormPage;
