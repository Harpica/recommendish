import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Rating } from '@mui/material';
import { CardVM } from '../../viewModels/partials/Card.VM';
import { Recommendation } from '../../utils/types';
import { DEFAULT_RECOMMENDATION } from '../../utils/constants';
import { getGroupColor } from '../../utils/utils';
import IconHeart from '../svgWrappers/IconHeart';
import IconComments from '../svgWrappers/IconComments';
import MDEditor from '@uiw/react-md-editor';

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
            className={`colored-corner-on-hover grid cursor-pointer grid-cols-[min-content,_minmax(230px,_1fr)]  gap-3 rounded pb-2 transition-all hover:shadow-md md:pb-0`}
            onClick={() => {
                vm.navigateToRecommendationPage(recommendation._id);
            }}
        >
            <div
                className={` bg-rose h-12 w-12 rounded md:h-48 md:w-48 bg-${getGroupColor(
                    recommendation.group
                )} `}
            >
                {recommendation.images[0] && (
                    <img
                        alt='illustration'
                        src={recommendation.images[0].url}
                        className='h-full w-full rounded object-cover'
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
                <div className='flex flex-row flex-wrap gap-1'>
                    <h4
                        className={`text-md font-bold text-${getGroupColor(
                            recommendation.group
                        )} overflow-hidden text-ellipsis whitespace-nowrap`}
                    >
                        {recommendation.product.name}
                    </h4>
                    <Rating
                        name='rating-read-only'
                        value={recommendation.product.current_rating}
                        readOnly
                    />
                </div>
                <MDEditor.Markdown
                    source={recommendation.body}
                    style={{ whiteSpace: 'pre-wrap' }}
                    className='add-ellipsis-to-p h-6 w-full overflow-hidden bg-inherit text-inherit'
                    disallowedElements={['img']}
                />
                <ul className='flex h-7 flex-row flex-wrap gap-2 overflow-hidden'>
                    {recommendation.tags.map((tag, i) => (
                        <li
                            key={'tag' + i}
                            className='rounded-full border-[1px] border-current pl-2 pr-2'
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
