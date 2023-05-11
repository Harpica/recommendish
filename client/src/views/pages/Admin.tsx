import { CurrentUser } from '../../utils/types';
import UserInfo from '../partials/UserInfo';
import UserTable from '../partials/UserTable';

import RecommendationTable from '../partials/RecommendationTable';
import { useTranslation } from 'react-i18next';
import SectionWithTabs from '../layouts/SectionWithTabs';

interface AdminProps {
    user: CurrentUser;
    setCurrentUser: (value: CurrentUser) => void;
    setAdminUser: () => void;
}

const Admin: React.FC<AdminProps> = ({
    user,
    setCurrentUser,
    setAdminUser,
}) => {
    const { t } = useTranslation();

    return (
        <main className='flex flex-col gap-8'>
            <section className='flex flex-col gap-3'>
                <h1 className='mb-5 w-fit text-2xl font-bold uppercase '>
                    {t('pages.admin.title')}
                </h1>
                <UserInfo user={user} />
            </section>
            <SectionWithTabs
                tabNames={[
                    t('pages.admin.tabUser'),
                    t('pages.admin.tabRecommendations'),
                ]}
                tabPanels={[
                    <UserTable
                        userRole={user.role}
                        userLanguage={user.language}
                        setCurrentUser={setCurrentUser}
                        setAdminUser={setAdminUser}
                    />,
                    <RecommendationTable user={user} />,
                ]}
            />
        </main>
    );
};

export default Admin;
