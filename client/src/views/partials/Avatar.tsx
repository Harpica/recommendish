import { observer } from 'mobx-react-lite';

const Avatar: React.FC<{ avatar: string }> = observer(({ avatar }) => {
    return (
        <div className='h-11 w-11 rounded-full bg-fuchsia-600'>
            {avatar && (
                <img
                    src={avatar}
                    alt='avatar'
                    className={'w-full, h-full rounded-full bg-cover'}
                />
            )}
        </div>
    );
});

export default Avatar;
