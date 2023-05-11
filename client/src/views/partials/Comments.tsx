import { FormEvent } from 'react';
import { Comment } from '../../utils/types';
import { getLocalDate } from '../../utils/utils';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import UserInfo from './UserInfo';
import AddCommentForm from './AddCommentForm';

interface CommentsProps {
    comments: Array<Comment>;
    sendComment: (e: FormEvent<HTMLFormElement>) => void;
    isAuth: boolean;
}

const Comments: React.FC<CommentsProps> = observer(
    ({ comments, sendComment, isAuth }) => {
        const { t } = useTranslation();
        return (
            <section>
                <h2 className='mb-5 text-xl font-bold uppercase'>
                    {t('pages.recommendation.comments')}
                </h2>
                <ul className='mb-10 flex flex-col gap-5'>
                    {comments.map((comment, i) => (
                        <li key={'comment' + i} className='flex flex-col gap-3'>
                            <div className='flex flex-row items-center gap-3'>
                                <UserInfo user={comment.owner} />
                                <p>{getLocalDate(comment.createdAt)}</p>
                            </div>
                            <p className='pl-11 pr-11'>{comment.body}</p>
                        </li>
                    ))}
                </ul>
                {isAuth && <AddCommentForm sendComment={sendComment} />}
            </section>
        );
    }
);

export default Comments;
