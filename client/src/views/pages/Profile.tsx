import RecommendationTable from '../partials/RecommendationTable';
import UserInfo from '../partials/UserInfo';
import { observer } from 'mobx-react-lite';
import IconNew from '../svgWrappers/IconNew';
import { NavLink } from 'react-router-dom';
import { CurrentUser } from '../../utils/types';
import { useTranslation } from 'react-i18next';
import ButtonNewRecommendation from '../UI/ButtonNewRecommendation';

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
                <div className='flex flex-row gap-3 items-end mb-5'>
                    <h2 className='text-xl font-bold w-fit  '>
                        {t('pages.profile.subtitle')}
                    </h2>
                    <ButtonNewRecommendation />
                </div>

                <RecommendationTable user={user} />
            </section>
        </main>
    );
});

export default Profile;
