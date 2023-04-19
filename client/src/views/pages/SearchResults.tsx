import { useParams } from 'react-router';
import Card from '../partials/Card';
import { useMemo, useEffect } from 'react';
import { SearchResultsVM } from '../../viewModels/pages/SearchResults.VM';
import { api } from '../../utils/HTTP/Api';
import { observer } from 'mobx-react-lite';
// import { setRecommendationProp } from '../../utils/types';

interface SearchResultsProps {}

const SearchResults: React.FC<SearchResultsProps> = observer(({}) => {
    const params = useParams();
    const vm = useMemo(
        () => new SearchResultsVM(params.param ?? '', api),
        [params]
    );

    return (
        <main className='flex flex-col gap-8'>
            <section>
                <h2 className='font-bold text-xl mb-5 uppercase'>
                    {`Search results for "${vm.searchValue}"`}
                </h2>
                {vm.isLoading ? (
                    <div>Loading...</div>
                ) : vm.recommendations.length !== 0 ? (
                    <ul className='flex flex-col gap-4'>
                        {vm.recommendations.map((recommendation, i) => (
                            <li key={'searchResult' + i}>
                                <Card
                                    recommendation={recommendation}
                                    // setCurrentRecommendation={
                                    //     setCurrentRecommendation
                                    // }
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recommendation found :C</p>
                )}
            </section>
        </main>
    );
});

export default SearchResults;
