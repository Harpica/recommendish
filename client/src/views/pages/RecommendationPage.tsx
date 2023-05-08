import { Rating } from '@mui/material';
import UserInfo from '../partials/UserInfo';
import { CurrentUser } from '../../utils/types';
import { observer } from 'mobx-react-lite';
import IconHeart from '../svgWrappers/IconHeart';
import { useParams } from 'react-router';
import { RecommendationVM } from '../../viewModels/pages/Recommendation.VM';
import { useMemo, useEffect, useRef } from 'react';
import Notification from '../layouts/Notification';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import IconEdit from '../svgWrappers/IconEdit';
import { getGroupColor, getLocalDate } from '../../utils/utils';
import { useTranslation } from 'react-i18next';
import MDEditor from '@uiw/react-md-editor';
import IconDownload from '../svgWrappers/IconDownload';
import Comments from '../partials/Comments';
import ImagePopup from '../partials/ImagePopup';

interface RecommendationProps {
    currentUser: CurrentUser;
}

const RecommendationPage: React.FC<RecommendationProps> = observer(
    ({ currentUser }) => {
        const params = useParams();
        const { t } = useTranslation();
        const pdfRef = useRef(null);

        const vm = useMemo(
            () =>
                new RecommendationVM(
                    params.id!,
                    currentUser._id,
                    currentUser.role
                ),
            [params.id, currentUser._id, currentUser.role]
        );

        useEffect(() => {
            const interval = vm.setCommentUpdateInterval();
            return () => {
                clearInterval(interval);
            };
        }, [vm]);

        return (
            <main className='flex flex-col gap-8'>
                {vm.isLoading ? (
                    <div>{t('loading')}</div>
                ) : (
                    <>
                        <section className='flex flex-col gap-3' ref={pdfRef}>
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
                                    {vm.isUserOwner() && (
                                        <NavLink
                                            to={
                                                ROUTES(vm.recommendation._id)
                                                    .edit
                                            }
                                            aria-label='edit'
                                            className={'hover:opacity-50 pt-1'}
                                        >
                                            <IconEdit />
                                        </NavLink>
                                    )}
                                    <button
                                        aria-label='download as pdf'
                                        className={'hover:opacity-50 pt-1'}
                                        onClick={() => vm.handleLoadPdf(pdfRef)}
                                    >
                                        <IconDownload />
                                    </button>
                                </div>
                                <UserInfo user={vm.recommendation.owner} />
                            </div>
                            <p>
                                {vm.recommendation.createdAt &&
                                    getLocalDate(vm.recommendation.createdAt)}
                            </p>
                            <div className='flex flex-row gap-1 flex-wrap'>
                                <h4
                                    className={`text-md font-bold text-${getGroupColor(
                                        vm.recommendation.group
                                    )} text-ellipsis overflow-hidden whitespace-nowrap`}
                                >
                                    {vm.recommendation.product.name}
                                </h4>
                                <Rating
                                    name='rating'
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
                                        className='pr-2 pl-2 border-[1px] rounded-full border-current'
                                    >
                                        {tag.name}
                                    </li>
                                ))}
                            </ul>
                            <div className='flex flex-col justify-center items-center gap-7 mt-5'>
                                <MDEditor.Markdown
                                    source={vm.recommendation.body}
                                    style={{ whiteSpace: 'pre-wrap' }}
                                    className='bg-inherit text-inherit  max-w-3xl w-full'
                                />
                                {vm.recommendation.images.length > 0 ? (
                                    vm.recommendation.images.map((image, i) => (
                                        <img
                                            key={'image' + i}
                                            src={image.url}
                                            alt='recommendation illustration'
                                            className='w-52 h-52 rounded object-cover cursor-pointer'
                                            onClick={() =>
                                                vm.openImagePopup(image.url)
                                            }
                                        />
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </section>
                        <Comments
                            comments={vm.comments}
                            sendComment={vm.createCommentFormHandler}
                            isAuth={vm.checkIsAuth()}
                        />
                    </>
                )}
                <Notification
                    isOpen={vm.notificationIsOpen}
                    close={vm.closeNotification}
                    message={vm.notificationMessage}
                />
                <ImagePopup
                    isOpen={vm.isImageOpen}
                    closePopup={vm.closeImagePopup}
                    imageUrl={vm.currentImage}
                />
            </main>
        );
    }
);

export default RecommendationPage;
