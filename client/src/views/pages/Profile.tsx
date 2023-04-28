import RecommendationTable from '../partials/RecommendationTable';
import UserInfo from '../partials/UserInfo';
import { observer } from 'mobx-react-lite';
import IconNew from '../svgWrappers/IconNew';
import { NavLink } from 'react-router-dom';
import { CurrentUser } from '../../utils/types';
import { useMemo } from 'react';
import { ProfileVM } from '../../viewModels/pages/Profile.VM';

interface ProfileProps {
    user: CurrentUser;
}

const Profile: React.FC<ProfileProps> = observer(({ user }) => {
    const vm = useMemo(() => new ProfileVM(user), [user._id]);

    return (
        <main className='flex flex-col gap-8'>
            <section className='flex flex-col gap-3'>
                <h1 className='text-2xl font-bold w-fit mb-5 uppercase '>
                    Profile
                </h1>
                <UserInfo user={user} />
            </section>
            <section className='flex flex-col gap-3'>
                <div className='flex flex-row gap-3 items-center mb-5'>
                    <h2 className='text-xl font-bold w-fit  '>
                        My recommendations
                    </h2>
                    <NavLink
                        to={'/new'}
                        aria-label='new recommendation'
                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40 pt-1'
                    >
                        <IconNew />
                    </NavLink>
                </div>

                {
                    <RecommendationTable
                        recommendations={vm.recommendations}
                        handleDelete={vm.handleDeleteRecommendation}
                    />
                }
            </section>
        </main>
    );
});

export default Profile;
