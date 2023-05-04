import { observer } from 'mobx-react-lite';
import { UserPublic } from '../../utils/types';
import IconHeart from '../svgWrappers/IconHeart';
import Avatar from './Avatar';

interface UserInfoProps {
    user: UserPublic;
}

const UserInfo: React.FC<UserInfoProps> = observer(({ user }) => {
    return (
        <div className='flex flex-row gap-2 items-center'>
            <Avatar avatar={user.avatar || ''} />
            <h2>{user.name}</h2>
            <div className='flex flex-row gap-1'>
                <IconHeart />
                <p>{user.likes}</p>
            </div>
        </div>
    );
});

export default UserInfo;
