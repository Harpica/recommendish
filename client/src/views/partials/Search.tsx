const Search = () => {
    return (
        <div className=' bg-white font-normal rounded-full p-1 pr-5 pl-5 flex flex-row shadow-md border-zinc-950 border-[1px] text-zinc-900'>
            <input
                className='outline-none w-[130px] md:min-w-[230px]'
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
    );
};

export default Search;
