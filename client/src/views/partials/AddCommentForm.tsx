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
                className='flex flex-row gap-3 justify-center items-start'
                onSubmit={(e) => {
                    sendComment(e);
                }}
            >
                <div className='w-full max-w-3xl rounded border-amber-600 border-[1px] '>
                    <textarea
                        name='comment-body'
                        className='w-full outline-none rounded text-current p-5  h-[180px]  bg-inherit resize-none hover:bg-opacity-80 scrollbar'
                        placeholder='Enter new comment...'
                    />
                </div>
                <button
                    type='submit'
                    className='rounded-full p-2 pr-5 pl-5 border-current border-[1px] hover:bg-amber-500 shadow-md'
                    aria-label='send comment'
                >
                    {t('pages.recommendation.send')}
                </button>
            </form>
        );
    }
);

export default AddCommentForm;
