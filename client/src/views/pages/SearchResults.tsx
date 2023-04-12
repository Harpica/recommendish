import Card from '../partials/Card';

const SearchResults = () => {
    return (
        <main className='flex flex-col gap-8'>
            <section>
                <h2 className='font-bold text-xl mb-5 uppercase'>
                    Search results
                </h2>
                <ul className='flex flex-col gap-4'>
                    <Card />
                    <Card />
                </ul>
            </section>
        </main>
    );
};

export default SearchResults;
