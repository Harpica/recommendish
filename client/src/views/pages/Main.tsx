import Card from '../partials/Card';
import TagCloud from '../partials/TagCloud';

const Main = () => {
    return (
        <>
            <header className='flex flex-col gap-3 w-full font-bold'>
                <div className='pt-5 pb-3 flex flex-col md:flex-row max-w-5xl w-full self-center'>
                    <div>
                        <h1 className='text-4xl md:text-6xl '>Recommendish:</h1>
                        <p className='text-xl md:text-right'>
                            Share your thoughts on
                        </p>
                    </div>
                    <div className='hidden md:block text-4xl ml-auto'>
                        <p className='text-amber-500'>Movies</p>
                        <p className='text-rose-500'>Games</p>
                        <p className='text-fuchsia-600'>Books</p>
                    </div>
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
                        <li>
                            <Card />
                        </li>
                        <li>
                            <Card />
                        </li>
                    </ul>
                </section>
                <section className='mb-5'>
                    <h2 className='font-bold text-xl mb-5 uppercase'>
                        Recent recommendations
                    </h2>
                    <ul className='flex flex-col gap-4'>
                        <Card />
                        <Card />
                    </ul>
                </section>
            </main>
        </>
    );
};

export default Main;
