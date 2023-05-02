import { useParams } from 'react-router';
import Card from '../partials/Card';
import { useMemo, useEffect } from 'react';
import { SearchResultsVM } from '../../viewModels/pages/SearchResults.VM';
import { api } from '../../utils/HTTP/Api';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
// import { setRecommendationProp } from '../../utils/types';

interface SearchResultsProps {}

const SearchResults: React.FC<SearchResultsProps> = observer(({}) => {
    const params = useParams();
    const { t } = useTranslation();
    const vm = useMemo(
        () => new SearchResultsVM(params.param ?? '', api),
        [params]
    );

    return (
        <main className='flex flex-col gap-8'>
            <section>
                <h2 className='font-bold text-xl mb-5 uppercase'>
                    {`${t('pages.searchResults.title')} "${vm.searchValue}"`}
                </h2>
                {vm.isLoading ? (
                    <div>{t('loading')}</div>
                ) : vm.recommendations.length !== 0 ? (
                    <ul className='flex flex-col gap-4'>
                        {vm.recommendations.map((recommendation, i) => (
                            <li key={'searchResult' + i}>
                                <Card recommendation={recommendation} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t('pages.searchResults.notFound')}</p>
                )}
            </section>
        </main>
    );
});

export default SearchResults;
