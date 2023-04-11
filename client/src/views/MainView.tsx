import TagCloud from '../components/TagCloud';

const MainView = () => {
    return (
        <>
            <div className='bg-gradient-to-r w-full self-center rounded-b-full from-amber-300 to-fuchsia-700 sticky top-0 left-0 h-5'></div>
            <div className='justify-center w-full grid grid-cols-[minmax(230px,_1280px)] grid-rows-[repeat(3,min-content)] gap-3 pl-3 pr-3 '>
                <nav className='sticky top-[20px] left-0  bg-zinc-50 pt-3 pb-3 min-h-fit flex flex-row justify-between items-center font-bold'>
                    <p>Logo</p>
                    <ul className='flex flex-row gap-4 items-center'>
                        <li>
                            <button type='button' aria-label='change theme'>
                                Theme
                            </button>
                        </li>
                        <li>
                            <button type='button' aria-label='change language'>
                                EN
                            </button>
                        </li>
                        <li>
                            <button
                                className='rounded-full p-2 pr-5 pl-5 border-zinc-950 border-[1px] hover:bg-amber-200'
                                type='button'
                                aria-label='log in'
                            >
                                Log In
                            </button>
                        </li>
                    </ul>
                </nav>
                <header className='flex flex-col gap-3 w-full font-bold'>
                    <div className='pt-3 pb-3 flex flex-row max-w-5xl w-full self-center'>
                        <div>
                            <h1 className='text-6xl '>Recommendish:</h1>
                            <p className='text-xl text-right'>
                                Share your thoughts on
                            </p>
                        </div>
                        <div className='text-4xl ml-auto'>
                            <p className='text-amber-500'>Movies</p>
                            <p className='text-rose-500'>Games</p>
                            <p className='text-fuchsia-600'>Books</p>
                        </div>
                    </div>
                    <div className='self-center bg-white font-normal rounded-full p-2 pr-5 pl-5 flex flex-row shadow-md border-zinc-950 border-[1px]'>
                        <input
                            className='outline-none min-w-[230px]'
                            type='text'
                            placeholder='Search...'
                        ></input>
                        <button className=''>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-10 h-10 hover:stroke-amber-500'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                            </svg>
                        </button>
                    </div>
                </header>
                <main className='flex flex-col gap-8'>
                    <section className='self-center p-3 max-w-xl'>
                        <TagCloud />
                    </section>
                    <section>
                        <h2 className='font-bold text-xl mb-5 uppercase'>
                            Popular recommendations
                        </h2>
                        <ul className='flex flex-col gap-4'>
                            <li className='grid grid-cols-[min-content,_minmax(230px,_1fr)] gap-3 transition-all colored-corner-on-hover cursor-pointer'>
                                <div className='bg-amber-500 w-48 h-48'>
                                    <img alt='illustration' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex flex-row justify-between text-sm'>
                                        <p>User Name</p>
                                        <p>Date of creation</p>
                                    </div>
                                    <h3 className='text-lg font-bold '>
                                        Long and creative name of Recommendation
                                    </h3>
                                    <h4 className='text-md font-bold text-amber-500 text-ellipsis overflow-hidden whitespace-nowrap'>
                                        Product name
                                    </h4>
                                    <span className=' text-ellipsis overflow-hidden whitespace-nowrap'>
                                        Some description. Some description. Some
                                        description. Some description. Some
                                        description. Some description.
                                    </span>
                                    <ul className='flex flex-row gap-2 flex-wrap h-7 overflow-hidden'>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Drama
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Cats
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                    </ul>
                                    <p>Number of likes</p>
                                </div>
                            </li>
                            <li className='grid grid-cols-[min-content,_minmax(230px,_1fr)] gap-3 transition-all colored-corner-on-hover cursor-pointer'>
                                <div className='bg-amber-500 w-48 h-48'>
                                    <img alt='illustration' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex flex-row justify-between text-sm'>
                                        <p>User Name</p>
                                        <p>Date of creation</p>
                                    </div>
                                    <h3 className='text-lg font-bold '>
                                        Long and creative name of Recommendation
                                    </h3>
                                    <h4 className='text-md font-bold text-amber-500 text-ellipsis overflow-hidden whitespace-nowrap'>
                                        Product name
                                    </h4>
                                    <span className=' text-ellipsis overflow-hidden whitespace-nowrap'>
                                        Some description. Some description. Some
                                        description. Some description. Some
                                        description. Some description.
                                    </span>
                                    <ul className='flex flex-row gap-2 flex-wrap h-7 overflow-hidden'>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Drama
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Cats
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                    </ul>
                                    <p>Number of likes</p>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <section className='mb-5'>
                        <h2 className='font-bold text-xl mb-5 uppercase'>
                            Recent recommendations
                        </h2>
                        <ul className='flex flex-col gap-4'>
                            <li className='grid grid-cols-[min-content,_minmax(230px,_1fr)] gap-3 transition-all colored-corner-on-hover cursor-pointer'>
                                <div className='bg-amber-500 w-48 h-48'>
                                    <img alt='illustration' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex flex-row justify-between text-sm'>
                                        <p>User Name</p>
                                        <p>Date of creation</p>
                                    </div>
                                    <h3 className='text-lg font-bold '>
                                        Long and creative name of Recommendation
                                    </h3>
                                    <h4 className='text-md font-bold text-amber-500 text-ellipsis overflow-hidden whitespace-nowrap'>
                                        Product name
                                    </h4>
                                    <span className=' text-ellipsis overflow-hidden whitespace-nowrap'>
                                        Some description. Some description. Some
                                        description. Some description. Some
                                        description. Some description.
                                    </span>
                                    <ul className='flex flex-row gap-2 flex-wrap h-7 overflow-hidden'>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Drama
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Cats
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                    </ul>
                                    <p>Number of likes</p>
                                </div>
                            </li>
                            <li className='grid grid-cols-[min-content,_minmax(230px,_1fr)] gap-3 transition-all colored-corner-on-hover cursor-pointer'>
                                <div className='bg-amber-500 w-48 h-48'>
                                    <img alt='illustration' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex flex-row justify-between text-sm'>
                                        <p>User Name</p>
                                        <p>Date of creation</p>
                                    </div>
                                    <h3 className='text-lg font-bold '>
                                        Long and creative name of Recommendation
                                    </h3>
                                    <h4 className='text-md font-bold text-amber-500 text-ellipsis overflow-hidden whitespace-nowrap'>
                                        Product name
                                    </h4>
                                    <span className=' text-ellipsis overflow-hidden whitespace-nowrap'>
                                        Some description. Some description. Some
                                        description. Some description. Some
                                        description. Some description.
                                    </span>
                                    <ul className='flex flex-row gap-2 flex-wrap h-7 overflow-hidden'>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Drama
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Cats
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                        <li className='pr-2 pl-2 border-[1px] rounded-full border-zinc-950'>
                                            Comedy
                                        </li>
                                    </ul>
                                    <p>Number of likes</p>
                                </div>
                            </li>
                        </ul>
                    </section>
                </main>
            </div>
            <footer className='bg-gradient-to-r rounded-t-full from-amber-300 to-fuchsia-700 min-h-fit p-3 mt-auto'></footer>
            {/* <LoginView /> */}
        </>
    );
};

export default MainView;
