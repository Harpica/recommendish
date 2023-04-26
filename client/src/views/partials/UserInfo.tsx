import { observer } from 'mobx-react-lite';
import { UserPublic } from '../../utils/types';
import IconHeart from '../svgWrappers/IconHeart';

interface UserInfoProps {
    user: UserPublic;
}

const UserInfo: React.FC<UserInfoProps> = observer(({ user }) => {
    return (
        <div className='flex flex-row gap-2 items-center'>
            <div className='w-11 h-11 rounded-full bg-fuchsia-600'>
                {user.avatar !== '' && (
                    <img
                        src={user.avatar}
                        alt='avatar'
                        className={'w-full, h-full rounded-full bg-cover'}
                    />
                )}
                <p>{'avatar = ' + user.avatar}</p>
            </div>
            <h2>{user.name}</h2>
            <div className='flex flex-row gap-1'>
                <IconHeart />
                <p>{user.likes}</p>
            </div>
        </div>
    );
});

export default UserInfo;
