import { Rating } from '@mui/material';
import UserInfo from '../partials/UserInfo';

const Recommendation = () => {
    return (
        <main className='flex flex-col gap-8'>
            <section className='flex flex-col gap-3'>
                <div className='flex flex-col-reverse gap-3 md:flex-row md:justify-between'>
                    <div className='flex flex-row gap-3 items-center'>
                        <h1 className='text-2xl font-bold w-fit'>
                            Name of the recommendation
                        </h1>
                        <div className='flex flex-row gap-1 pt-1'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6 hover:fill-amber-500 hover:cursor-pointer'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                                />
                            </svg>
                            <p>23</p>
                        </div>
                    </div>
                    <UserInfo />
                </div>
                <p>Date of creation</p>
                <div className='flex flex-row gap-1 flex-wrap'>
                    <h4 className='text-md font-bold text-amber-500 text-ellipsis overflow-hidden whitespace-nowrap'>
                        Product name
                    </h4>
                    <Rating name='read-only' value={4} />
                </div>
                <dl className='flex flex-row gap-2 items-center'>
                    <dt>Author's rating: </dt>
                    <dd className='text-xl'>9/10</dd>
                </dl>
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
                <div className='flex flex-row flex-wrap justify-center gap-7 mt-5'>
                    <p className='max-w-3xl whitespace-pre-line'>
                        {` Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum dolor et atque excepturi sunt laborum at magni sed odit nobis. Incidunt ab, doloribus tempora amet laudantium earum ducimus eligendi nostrum!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores atque ad laudantium molestias expedita, temporibus sed suscipit blanditiis, eveniet eaque exercitationem explicabo, accusamus aliquid. A labore obcaecati eos soluta ratione?
                        
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis nesciunt tenetur excepturi. Sint provident commodi quod libero, reprehenderit optio similique facere voluptates, cum ipsam qui adipisci deleniti quia veniam architecto?`}
                    </p>
                    <div className='w-52 max-h-52 h-52 bg-amber-500 rounded'></div>
                </div>
            </section>
            <section>
                <h2 className='font-bold text-xl mb-5 uppercase'>Comments</h2>
                <ul className='flex flex-col gap-5 mb-10'>
                    <li className='flex flex-col gap-3'>
                        <div className='flex flex-row gap-3 items-center'>
                            <UserInfo />
                            <p>Date of the comment</p>
                        </div>
                        <p className='pl-11 pr-11'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quam laborum vero similique iste numquam ut
                            architecto fugit? Repellendus minima nesciunt optio
                            ipsam molestias expedita animi recusandae debitis,
                            sint saepe quia.
                        </p>
                    </li>
                    <li className='flex flex-col gap-3'>
                        <div className='flex flex-row gap-3 items-center'>
                            <UserInfo />
                            <p>Date of the comment</p>
                        </div>
                        <p className='pl-11 pr-11'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quam laborum vero similique iste numquam ut
                            architecto fugit? Repellendus minima nesciunt optio
                            ipsam molestias expedita animi recusandae debitis,
                            sint saepe quia.
                        </p>
                    </li>
                </ul>
                <form className='flex flex-row gap-3 justify-center items-start'>
                    <div className='w-full max-w-3xl'>
                        <textarea
                            className='w-full rounded outline-none text-inherit bg-inherit p-5   h-[180px] bg-zinc-600 bg-opacity-50 resize-none hover:bg-opacity-80 scrollbar'
                            placeholder='Enter new comment...'
                        />
                    </div>
                    <button
                        type='submit'
                        className='rounded-full p-2 pr-5 pl-5 border-inherit border-[1px] hover:bg-amber-500'
                        aria-label='send comment'
                    >
                        Send
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Recommendation;
