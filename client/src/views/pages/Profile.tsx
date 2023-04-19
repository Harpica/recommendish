import Card from '../partials/Card';
import CardToolbar from '../partials/CardToolbar';
import RecommendationTable from '../partials/RecommendationTable';
import UserInfo from '../partials/UserInfo';
import { observer } from 'mobx-react-lite';
import IconNew from '../svgWrappers/IconNew';
import { NavLink } from 'react-router-dom';
import { CurrentUser } from '../../utils/types';

interface ProfileProps {
    user: CurrentUser;
}

const Profile: React.FC<ProfileProps> = observer(({ user }) => {
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
                        My recommedations
                    </h2>
                    <NavLink
                        to={'/new'}
                        aria-label='new recommendation'
                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40 pt-1'
                    >
                        <IconNew />
                    </NavLink>
                </div>

                {<RecommendationTable />}

                {/* <ul className='min-h-[500px] max-h-[50vh] overflow-auto scrollbar flex flex-col gap-3'>
                    <li
                        className='relative toolbar-visible-onhover'
                        onClick={(e) => {
                            e.currentTarget.classList.toggle('toolbar-visible');
                        }}
                    >
                        <Card isInteractive={false} />
                        <CardToolbar />
                    </li>
                    <li
                        className='relative toolbar-visible-onhover'
                        onClick={(e) => {
                            e.currentTarget.classList.toggle('toolbar-visible');
                        }}
                    >
                        <Card isInteractive={false} />
                        <CardToolbar />
                    </li>
                    <li
                        className='relative toolbar-visible-onhover'
                        onClick={(e) => {
                            e.currentTarget.classList.toggle('toolbar-visible');
                        }}
                    >
                        <Card isInteractive={false} />
                        <CardToolbar />
                    </li>
                    <li
                        className='relative toolbar-visible-onhover'
                        onClick={(e) => {
                            e.currentTarget.classList.toggle('toolbar-visible');
                        }}
                    >
                        <Card isInteractive={false} />
                        <CardToolbar />
                    </li>
                    <li
                        className='relative toolbar-visible-onhover'
                        onClick={(e) => {
                            e.currentTarget.classList.toggle('toolbar-visible');
                        }}
                    >
                        <Card isInteractive={false} />
                        <CardToolbar />
                    </li>
                    <li
                        className='relative toolbar-visible-onhover'
                        onClick={(e) => {
                            e.currentTarget.classList.toggle('toolbar-visible');
                        }}
                    >
                        <Card isInteractive={false} />
                        <CardToolbar />
                    </li>
                    <li
                        className='relative toolbar-visible-onhover'
                        onClick={(e) => {
                            e.currentTarget.classList.toggle('toolbar-visible');
                        }}
                    >
                        <Card isInteractive={false} />
                        <CardToolbar />
                    </li>
                </ul> */}
            </section>
        </main>
    );
});

export default Profile;
