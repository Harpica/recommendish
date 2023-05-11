import { useParams } from 'react-router';
import Card from '../partials/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useMemo } from 'react';
import { SearchResultsVM } from '../../viewModels/pages/SearchResults.VM';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

interface SearchResultsProps {}

const SearchResults: React.FC<SearchResultsProps> = observer(() => {
    const params = useParams();
    const { t } = useTranslation();
    const vm = useMemo(() => new SearchResultsVM(params.param ?? ''), [params]);

    useEffect(() => {
        if (vm.recommendations.length === 0 && !vm.isLoading) {
            vm.getInitialData();
        }
    }, []);

    return (
        <main className='flex flex-col gap-8'>
            <section>
                <h2 className='font-bold text-xl mb-5 uppercase'>
                    {`${t('pages.searchResults.title')} "${vm.searchValue}"`}
                </h2>
                {vm.isLoading ? (
                    <CircularProgress />
                ) : (
                    vm.recommendations.length === 0 && (
                        <p>{t('pages.searchResults.notFound')}</p>
                    )
                )}
                <InfiniteScroll
                    dataLength={vm.recommendations.length}
                    next={() => {
                        console.log('scroller next');
                        vm.getNextData();
                    }}
                    hasMore={vm.hasMore}
                    loader={<CircularProgress />}
                    style={{ overflow: 'hidden' }}
                    endMessage={''}
                >
                    <ul className='flex flex-col gap-4'>
                        {vm.recommendations.map((recommendation, i) => (
                            <li key={'searchResult' + i}>
                                <Card recommendation={recommendation} />
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
            </section>
        </main>
    );
});

export default SearchResults;
