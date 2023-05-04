import RecommendationTable from '../partials/RecommendationTable';
import UserInfo from '../partials/UserInfo';
import { observer } from 'mobx-react-lite';
import IconNew from '../svgWrappers/IconNew';
import { NavLink } from 'react-router-dom';
import { CurrentUser } from '../../utils/types';
import { useTranslation } from 'react-i18next';

interface ProfileProps {
    user: CurrentUser;
}

const Profile: React.FC<ProfileProps> = observer(({ user }) => {
    const { t } = useTranslation();
    return (
        <main className='flex flex-col gap-8'>
            <section className='flex flex-col gap-3'>
                <h1 className='text-2xl font-bold w-fit mb-5 uppercase '>
                    {t('pages.profile.title')}
                </h1>
                <UserInfo user={user} />
            </section>
            <section className='flex flex-col gap-3'>
                <div className='flex flex-row gap-3 items-center mb-5'>
                    <h2 className='text-xl font-bold w-fit  '>
                        {t('pages.profile.subtitle')}
                    </h2>
                    <NavLink
                        to={'/new'}
                        aria-label='new recommendation'
                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40 pt-1'
                    >
                        <IconNew />
                    </NavLink>
                </div>

                <RecommendationTable user={user} />
            </section>
        </main>
    );
});

export default Profile;
