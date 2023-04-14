const CardToolbar = () => {
    return (
        <div
            className='invisible transition-all absolute top-0 left-0 bg-zinc-500 bg-opacity-50 w-full h-full rounded z-[5] flex flex-col justify-center items-center'
            id='toolbar'
        >
            <ul className='bg-slate-50 rounded-full p-2 pr-5 pl-5 text-slate-950 flex flex-row gap-3'>
                <li>
                    <button type='button' className='hover:opacity-50'>
                        Open
                    </button>
                </li>
                <li>
                    <button type='button' className='hover:opacity-50'>
                        Edit
                    </button>
                </li>
                <li>
                    <button type='button' className='hover:opacity-50'>
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default CardToolbar;
