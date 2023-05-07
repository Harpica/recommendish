import { Rating } from '@mui/material';
import { Recommendation } from '../../utils/types';
import { DEFAULT_RECOMMENDATION } from '../../utils/constants';
import IconHeart from '../svgWrappers/IconHeart';
import IconComments from '../svgWrappers/IconComments';
import { useMemo } from 'react';
import { CardVM } from '../../viewModels/partials/Card.VM';
import { useNavigate } from 'react-router';
import { getGroupColor } from '../../utils/utils';

interface CardProps {
    recommendation: Recommendation;
}

const Card: React.FC<CardProps> = ({
    recommendation = DEFAULT_RECOMMENDATION,
}) => {
    const navigate = useNavigate();
    const vm = useMemo(() => new CardVM(navigate), [navigate]);

    return (
        <div
            className={`grid grid-cols-[min-content,_minmax(230px,_1fr)] gap-3 transition-all  cursor-pointer rounded colored-corner-on-hover hover:shadow-md`}
            onClick={() => {
                vm.navigateToRecommendationPage(recommendation._id);
            }}
        >
            <div
                className={` w-12 h-12 md:w-48 md:h-48 rounded bg-${getGroupColor(
                    recommendation.group
                )}`}
            >
                {recommendation.images[0] && (
                    <img
                        alt='illustration'
                        src={recommendation.images[0].url}
                        className='w-full h-full rounded object-cover'
                    />
                )}
            </div>
            <div className='flex flex-col gap-1'>
                <div className='flex flex-row justify-between text-sm'>
                    <p>{recommendation.owner.name}</p>
                    <p>
                        {recommendation.createdAt &&
                            new Date(recommendation.createdAt).toLocaleString()}
                    </p>
                </div>
                <h3 className='text-lg font-bold '>{recommendation.name}</h3>
                <div className='flex flex-row gap-1 flex-wrap'>
                    <h4
                        className={`text-md font-bold text-${getGroupColor(
                            recommendation.group
                        )} text-ellipsis overflow-hidden whitespace-nowrap`}
                    >
                        {recommendation.product.name}
                    </h4>
                    <Rating
                        name='rating-read-only'
                        value={recommendation.product.current_rating}
                        readOnly
                    />
                </div>
                <span className=' text-ellipsis overflow-hidden whitespace-nowrap'>
                    {recommendation.body}
                </span>
                <ul className='flex flex-row gap-2 flex-wrap h-7 overflow-hidden'>
                    {recommendation.tags.map((tag, i) => (
                        <li
                            key={'tag' + i}
                            className='pr-2 pl-2 border-[1px] rounded-full border-current'
                        >
                            {tag.name}
                        </li>
                    ))}
                </ul>
                <div className='flex flex-row gap-3'>
                    <div className='flex flex-row gap-1'>
                        <IconHeart />
                        <p>{recommendation.likes.length}</p>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <IconComments />
                        <p>{recommendation.comments.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
