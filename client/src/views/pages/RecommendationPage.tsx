import { Rating } from '@mui/material';
import UserInfo from '../partials/UserInfo';
import { Comment, CurrentUser, Recommendation } from '../../utils/types';
import { observer } from 'mobx-react-lite';
import IconHeart from '../svgWrappers/IconHeart';
import { useParams } from 'react-router';
import { RecommendationVM } from '../../viewModels/pages/Recommendation.VM';
import { useMemo, useEffect } from 'react';
import Notification from '../partials/Notification';

interface RecommendationProps {
    currentUser: CurrentUser;
}

const RecommendationPage: React.FC<RecommendationProps> = observer(
    ({ currentUser }) => {
        const params = useParams();
        const vm = useMemo(
            () => new RecommendationVM(params.id!, currentUser),
            [params, currentUser]
        );

        useEffect(() => {
            const interval = vm.setCommentUpdateInterval();
            return () => {
                clearInterval(interval);
            };
        }, []);

        return (
            <main className='flex flex-col gap-8'>
                {vm.isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <section className='flex flex-col gap-3'>
                            <div className='flex flex-col-reverse gap-3 md:flex-row md:justify-between'>
                                <div className='flex flex-row gap-3 items-center'>
                                    <h1 className='text-2xl font-bold w-fit'>
                                        {vm.recommendation.name}
                                    </h1>
                                    <div className='flex flex-row gap-1 pt-1  '>
                                        <div
                                            onClick={() =>
                                                vm.handleToggleLike()
                                            }
                                        >
                                            <IconHeart
                                                classes={`hover:fill-amber-500 hover:cursor-pointer ${
                                                    vm.checkIfLiked() &&
                                                    'fill-amber-500 hover:opacity-50'
                                                }`}
                                            />
                                        </div>
                                        <p>{vm.recommendation.likes.length}</p>
                                    </div>
                                </div>
                                <UserInfo user={vm.recommendation.owner} />
                            </div>
                            <p>{vm.recommendation.createdAt}</p>
                            <div className='flex flex-row gap-1 flex-wrap'>
                                <h4 className='text-md font-bold text-amber-500 text-ellipsis overflow-hidden whitespace-nowrap'>
                                    {vm.recommendation.product.name}
                                </h4>
                                <Rating
                                    name='read-only'
                                    value={
                                        vm.recommendation.product.current_rating
                                    }
                                    onChange={(_e, value) => {
                                        if (value !== null) {
                                            vm.rateProduct(value);
                                        }
                                    }}
                                />
                            </div>
                            <dl className='flex flex-row gap-2 items-center'>
                                <dt>Author's rating: </dt>
                                <dd className='text-xl'>{`${vm.recommendation.productRating}/10`}</dd>
                            </dl>
                            <ul className='flex flex-row gap-2 flex-wrap h-7 overflow-hidden'>
                                {vm.recommendation.tags.map((tag, i) => (
                                    <li
                                        key={tag.name + i}
                                        className='pr-2 pl-2 border-[1px] rounded-full border-inherit'
                                    >
                                        {tag.name}
                                    </li>
                                ))}
                            </ul>
                            <div className='flex flex-row flex-wrap justify-center gap-7 mt-5'>
                                <p className='max-w-3xl whitespace-pre-line'>
                                    {vm.recommendation.body}
                                </p>
                                {vm.recommendation.images.length > 0 ? (
                                    vm.recommendation.images.map((image, i) => (
                                        <div className='w-52 max-h-52 h-52 bg-amber-500 rounded'>
                                            <img
                                                key={'image' + i}
                                                src={image}
                                                alt='recommendation illustration'
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </section>
                        <section>
                            <h2 className='font-bold text-xl mb-5 uppercase'>
                                Comments
                            </h2>
                            <ul className='flex flex-col gap-5 mb-10'>
                                {vm.comments.map((comment, i) => (
                                    <li
                                        key={'comment' + i}
                                        className='flex flex-col gap-3'
                                    >
                                        <div className='flex flex-row gap-3 items-center'>
                                            <UserInfo user={comment.owner} />
                                            <p>{comment.createdAt}</p>
                                        </div>
                                        <p className='pl-11 pr-11'>
                                            {comment.body}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            {vm.checkIsAuth() && (
                                <form
                                    className='flex flex-row gap-3 justify-center items-start'
                                    onSubmit={(e) => {
                                        vm.createCommentFormHandler(e);
                                    }}
                                >
                                    <div className='w-full max-w-3xl'>
                                        <textarea
                                            name='comment-body'
                                            className='w-full rounded outline-none text-inherit bg-inherit p-5   h-[180px] bg-zinc-600 bg-opacity-50 resize-none hover:bg-opacity-80 scrollbar'
                                            placeholder='Enter new comment...'
                                        />
                                    </div>
                                    <button
                                        type='submit'
                                        className='rounded-full p-2 pr-5 pl-5 border-inherit border-[1px] hover:bg-amber-500'
                                        aria-label='send comment'
                                    >
                                        Send
                                    </button>
                                </form>
                            )}
                        </section>
                    </>
                )}
                <Notification
                    isOpen={vm.notificationIsOpen}
                    close={vm.closeNotification}
                    message={vm.notificationMessage}
                />
            </main>
        );
    }
);

export default RecommendationPage;
