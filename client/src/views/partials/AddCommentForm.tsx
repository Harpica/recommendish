import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { FormEvent } from 'react';

interface AddCommentFormProps {
    sendComment: (e: FormEvent<HTMLFormElement>) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = observer(
    ({ sendComment }) => {
        const { t } = useTranslation();
        return (
            <form
                className='flex flex-row items-start justify-center gap-3'
                onSubmit={(e) => {
                    sendComment(e);
                }}
            >
                <div className='w-full max-w-3xl rounded border-[1px] border-amber-600 '>
                    <textarea
                        name='comment-body'
                        className='scrollbar h-[180px] w-full resize-none rounded  bg-inherit  p-5 text-current outline-none hover:bg-opacity-80'
                        placeholder='Enter new comment...'
                    />
                </div>
                <button
                    type='submit'
                    className='rounded-full border-[1px] border-current p-2 pl-5 pr-5 shadow-md hover:bg-amber-500'
                    aria-label='send comment'
                >
                    {t('pages.recommendation.send')}
                </button>
            </form>
        );
    }
);

export default AddCommentForm;
