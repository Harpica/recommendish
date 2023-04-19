import { CurrentUser } from '../../utils/types';
import UserInfo from '../partials/UserInfo';
import UserTable from '../partials/UserTable';

interface AdminProps {
    user: CurrentUser;
}

const Admin: React.FC<AdminProps> = ({ user }) => {
    return (
        <main className='flex flex-col gap-8'>
            <section className='flex flex-col gap-3'>
                <h1 className='text-2xl font-bold w-fit mb-5 uppercase '>
                    Admin Profile
                </h1>
                <UserInfo user={user} />
            </section>
            <section className='flex flex-col gap-3'>
                <div className='flex flex-row gap-3 items-center mb-5'>
                    <h2 className='text-xl font-bold w-fit '>Users</h2>
                </div>
                <UserTable />
            </section>
        </main>
    );
};

export default Admin;
