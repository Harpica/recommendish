import { Rating } from '@mui/material';

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
                <div className='flex flex-row gap-1 flex-wrap'>
                    <h4 className='text-md font-bold text-amber-500 text-ellipsis overflow-hidden whitespace-nowrap'>
                        Product name
                    </h4>
                    <Rating name='read-only' value={4} readOnly />
                </div>
                <span className=' text-ellipsis overflow-hidden whitespace-nowrap'>
                    Some description. Some description. Some description. Some
                    description. Some description. Some description.
                </span>
                <ul className='flex flex-row gap-2 flex-wrap h-7 overflow-hidden'>
                    <li className='pr-2 pl-2 border-[1px] rounded-full border-inherit'>
                        Drama
                    </li>
                    <li className='pr-2 pl-2 border-[1px] rounded-full border-inherit'>
                        Cats
                    </li>
                    <li className='pr-2 pl-2 border-[1px] rounded-full border-inherit'>
                        Comedy
                    </li>
                    <li className='pr-2 pl-2 border-[1px] rounded-full border-inherit'>
                        Comedy
                    </li>
                    <li className='pr-2 pl-2 border-[1px] rounded-full border-inherit'>
                        Comedy
                    </li>
                    <li className='pr-2 pl-2 border-[1px] rounded-full border-inherit'>
                        Comedy
                    </li>
                </ul>
                <div className='flex flex-row gap-3'>
                    <div className='flex flex-row gap-1'>
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
                                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                            />
                        </svg>
                        <p>23</p>
                    </div>
                    <div className='flex flex-row gap-1'>
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
                                d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
                            />
                        </svg>

                        <p>15</p>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Card;
