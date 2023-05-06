import { CurrentUser } from '../../utils/types';
import UserInfo from '../partials/UserInfo';
import UserTable from '../partials/UserTable';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import TabPanel from '../layouts/TabPanel';
import RecommendationTable from '../partials/RecommendationTable';
import { useTranslation } from 'react-i18next';

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

interface AdminProps {
    user: CurrentUser;
    setCurrentUser: (value: CurrentUser) => void;
    setAdminUser: (value: CurrentUser) => void;
}

const Admin: React.FC<AdminProps> = ({
    user,
    setCurrentUser,
    setAdminUser,
}) => {
    const { t } = useTranslation();

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <main className='flex flex-col gap-8'>
            <section className='flex flex-col gap-3'>
                <h1 className='text-2xl font-bold w-fit mb-5 uppercase '>
                    {t('pages.admin.title')}
                </h1>
                <UserInfo user={user} />
            </section>
            <section className='flex flex-col w-full'>
                <div className='flex flex-row gap-3 items-center mb-5  pb-3'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='tabs'
                    >
                        <Tab
                            label={t('pages.admin.tabUser')}
                            {...a11yProps(0)}
                            className='text-lg font-bold w-fit capitalize text-inherit rounded'
                        />
                        <Tab
                            label={t('pages.admin.tabRecommendations')}
                            {...a11yProps(1)}
                            className='text-lg font-bold w-fit capitalize text-inherit rounded'
                        />
                    </Tabs>
                </div>
                <TabPanel value={value} index={0}>
                    <UserTable
                        user={user}
                        setCurrentUser={setCurrentUser}
                        setAdminUser={setAdminUser}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <RecommendationTable user={user} />
                </TabPanel>
            </section>
        </main>
    );
};

export default Admin;
