import Card from '../partials/Card';
import CardToolbar from '../partials/CardToolbar';
import RecommendationTable from '../partials/RecommendationTable';
import UserInfo from '../partials/UserInfo';

const Profile = () => {
    return (
        <main className='flex flex-col gap-8'>
            <section className='flex flex-col gap-3'>
                <h1 className='text-2xl font-bold w-fit mb-5 uppercase '>
                    Profile
                </h1>
                <UserInfo />
            </section>
            <section className='flex flex-col gap-3'>
                <div className='flex flex-row gap-3 items-center mb-5'>
                    <h2 className='text-xl font-bold w-fit  '>
                        My recommedations
                    </h2>
                    <button
                        type='button'
                        aria-label='new recommendation'
                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40 pt-1'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6 stroke-amber-500'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                    </button>
                </div>

                <RecommendationTable />

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
};

export default Profile;
