import { Rating } from '@mui/material';
import { Tooltip } from '@mui/material';
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
                                <div className='flex flex-row items-center gap-3'>
                                    <h1 className='w-fit text-2xl font-bold'>
                                        {vm.recommendation.name}
                                    </h1>
                                    <div className='flex flex-row gap-1 pt-1  '>
                                        <Tooltip
                                            title={
                                                vm.checkIfLiked()
                                                    ? t('tooltip.dislike')
                                                    : t('tooltip.like')
                                            }
                                            describeChild
                                        >
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
                                        </Tooltip>
                                        <p>{vm.recommendation.likes.length}</p>
                                    </div>
                                    {vm.isUserOwner() && (
                                        <Tooltip
                                            title={t('tooltip.edit')}
                                            describeChild
                                        >
                                            <NavLink
                                                to={
                                                    ROUTES(
                                                        vm.recommendation._id
                                                    ).edit
                                                }
                                                className={
                                                    'pt-1 hover:opacity-50'
                                                }
                                            >
                                                <IconEdit />
                                            </NavLink>
                                        </Tooltip>
                                    )}
                                    <Tooltip
                                        describeChild
                                        title={t('tooltip.download')}
                                    >
                                        <button
                                            className={'pt-1 hover:opacity-50'}
                                            onClick={() => {
                                                vm.handleLoadPdf(pdfRef);
                                            }}
                                        >
                                            <IconDownload />
                                        </button>
                                    </Tooltip>
                                </div>
                                <UserInfo user={vm.recommendation.owner} />
                            </div>
                            <p>
                                {vm.recommendation.createdAt &&
                                    getLocalDate(vm.recommendation.createdAt)}
                            </p>
                            <div className='flex flex-row flex-wrap gap-1'>
                                <h4
                                    className={`text-md font-bold text-${getGroupColor(
                                        vm.recommendation.group
                                    )} overflow-hidden text-ellipsis whitespace-nowrap`}
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
                            <dl className='flex flex-row items-center gap-2'>
                                <dt>Author's rating: </dt>
                                <dd className='text-xl'>{`${vm.recommendation.productRating}/10`}</dd>
                            </dl>
                            <ul className='flex h-7 flex-row flex-wrap gap-2 overflow-hidden'>
                                {vm.recommendation.tags.map((tag, i) => (
                                    <li
                                        key={tag.name + i}
                                        className='rounded-full border-[1px] border-current pl-2 pr-2'
                                    >
                                        {tag.name}
                                    </li>
                                ))}
                            </ul>
                            <div className='mt-5 flex flex-col items-center justify-center gap-7'>
                                <MDEditor.Markdown
                                    source={vm.recommendation.body}
                                    style={{ whiteSpace: 'pre-wrap' }}
                                    className='w-full max-w-3xl  bg-inherit text-inherit'
                                />
                                {vm.recommendation.images.length > 0 ? (
                                    <div className='flex flex-row flex-wrap gap-7'>
                                        {vm.recommendation.images.map(
                                            (image, i) => (
                                                <img
                                                    key={'image' + i}
                                                    src={image.url}
                                                    alt='recommendation illustration'
                                                    className='h-52 w-52 cursor-pointer rounded object-cover'
                                                    onClick={() =>
                                                        vm.openImagePopup(
                                                            image.url
                                                        )
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
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
