import { useState } from 'react';
import Search from './Search';

const Nav = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(
        (() => (window.innerWidth >= 768 ? true : false))()
    );
    return (
        <nav className='sticky top-[20px] left-0  bg-zinc-50 pt-3 pb-3 min-h-fit flex flex-row justify-between items-center font-bold '>
            <div className='flex flex-row gap-1 items-center hover:cursor-pointer hover:opacity-40'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46'
                    />
                </svg>

                <p className='hidden md:block text-xs'>Recommendish</p>
            </div>
            <Search />
            <button
                type='button'
                className='md:invisible md:hidden hover:cursor-pointer hover:opacity-40'
                onClick={() => {
                    setMenuIsOpen(!menuIsOpen);
                }}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                    />
                </svg>
            </button>
            <ul
                className={`${
                    menuIsOpen ? 'visible flex' : 'invisible hidden'
                } absolute top-[73px] right-0 bg-inherit w-full md:w-fit md:static md:flex md:visible flex-row gap-4 justify-between items-center`}
            >
                <li>
                    <button
                        type='button'
                        aria-label='new recommendation'
                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
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
                </li>
                <li>
                    <button
                        type='button'
                        aria-label='change theme'
                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
                            />
                        </svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
</svg> */}
                    </button>
                </li>
                <li>
                    <button
                        type='button'
                        aria-label='change language'
                        className='hover:cursor-pointer hover:opacity-40'
                    >
                        EN
                    </button>
                </li>
                <li>
                    <button
                        type='button'
                        aria-label='profile'
                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
                    >
                        <div className='w-11 h-11 rounded-full bg-fuchsia-600'>
                            <img />
                        </div>
                    </button>
                </li>
                {/* <li>
                    <button
                        className='rounded-full p-2 pr-5 pl-5 border-zinc-950 border-[1px] hover:bg-amber-200'
                        type='button'
                        aria-label='log in'
                    >
                        Log In
                    </button>
                </li> */}
                <li>
                    <button
                        className='flex justify-center items-center hover:cursor-pointer hover:opacity-40'
                        type='button'
                        aria-label='log out'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                            />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
