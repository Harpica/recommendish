const Card = () => {
    return (
        <li className='grid grid-cols-1 md:grid-cols-[min-content,_minmax(230px,_1fr)] gap-3 transition-all colored-corner-on-hover cursor-pointer'>
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
                    Some description. Some description. Some description. Some
                    description. Some description. Some description.
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
    );
};

export default Card;
