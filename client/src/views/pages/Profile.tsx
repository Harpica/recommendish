import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import RecommendationTable from '../partials/RecommendationTable';
import UserInfo from '../partials/UserInfo';
import ButtonNewRecommendation from '../UI/ButtonNewRecommendation';
import { CurrentUser } from '../../utils/types';

interface ProfileProps {
    user: CurrentUser;
}

const Profile: React.FC<ProfileProps> = observer(({ user }) => {
    const { t } = useTranslation();
    return (
        <main className='flex flex-col gap-8'>
            <section className='flex flex-col gap-3'>
                <h1 className='mb-5 w-fit text-2xl font-bold uppercase '>
                    {t('pages.profile.title')}
                </h1>
                <UserInfo user={user} />
            </section>
            <section className='flex flex-col gap-3'>
                <div className='mb-5 flex flex-row items-end gap-3'>
                    <h2 className='w-fit text-xl font-bold  '>
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
