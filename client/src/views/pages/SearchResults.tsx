import { useParams } from 'react-router';
import Card from '../partials/Card';

const SearchResults = () => {
    const params = useParams();
    return (
        <main className='flex flex-col gap-8'>
            <section>
                <h2 className='font-bold text-xl mb-5 uppercase'>
                    {`Search results for "${params.param}"`}
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
        </main>
    );
};

export default SearchResults;
