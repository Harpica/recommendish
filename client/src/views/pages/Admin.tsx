import { CurrentUser } from '../../utils/types';
import UserInfo from '../partials/UserInfo';
import UserTable from '../partials/UserTable';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import TabPanel from '../layouts/TabPanel';
import RecommendationTable from '../partials/RecommendationTable';

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

interface AdminProps {
    user: CurrentUser;
}

const Admin: React.FC<AdminProps> = ({ user }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <main className='flex flex-col gap-8'>
            <section className='flex flex-col gap-3'>
                <h1 className='text-2xl font-bold w-fit mb-5 uppercase '>
                    Admin Profile
                </h1>
                <UserInfo user={user} />
            </section>
            <section className='flex flex-col w-full'>
                <div className='flex flex-row gap-3 items-center mb-5  pb-3'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                    >
                        <Tab
                            label='Users'
                            {...a11yProps(0)}
                            className='text-lg font-bold w-fit capitalize text-inherit  rounded'
                        />
                        <Tab
                            label='My recommendations'
                            {...a11yProps(1)}
                            className='text-lg font-bold w-fit capitalize text-inherit rounded'
                        />
                    </Tabs>
                </div>
                <TabPanel value={value} index={0}>
                    <UserTable user={user} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <RecommendationTable user={user} />
                </TabPanel>
            </section>
        </main>
    );
};

export default Admin;
