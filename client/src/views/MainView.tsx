import Card from './partials/Card';
import TagCloud from './partials/TagCloud';
import NavView from './NavView';

const MainView = () => {
    return (
        <>
            <div className='bg-gradient-to-r w-full self-center rounded-b-full from-amber-300 to-fuchsia-700 sticky top-0 left-0 h-5'></div>
            <div className='justify-center w-full grid grid-cols-[minmax(230px,_1280px)] grid-rows-[repeat(3,min-content)] gap-3 pl-3 pr-3 '>
                <NavView />
                <header className='flex flex-col gap-3 w-full font-bold'>
                    <div className='pt-5 pb-3 flex flex-col md:flex-row max-w-5xl w-full self-center'>
                        <div>
                            <h1 className='text-4xl md:text-6xl '>
                                Recommendish:
                            </h1>
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
                            <Card />
                            <Card />
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
            </div>
            <footer className='bg-gradient-to-r rounded-t-full from-amber-300 to-fuchsia-700 min-h-fit p-3 mt-auto'></footer>
            {/* <LoginView /> */}
        </>
    );
};

export default MainView;
