import { useMemo } from 'react';
import IconSearch from '../svgWrappers/IconSearch';
import { SearchInputVM } from '../../viewModels/partials/SearchInput.VM';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

const Search = observer(() => {
    const navigate = useNavigate();
    const vm = useMemo(() => new SearchInputVM(navigate), [navigate]);
    const { t } = useTranslation();

    return (
        <form
            autoComplete='off'
            onSubmit={(e) => {
                vm.handleSearchButton(e);
            }}
            className=' flex flex-row rounded-full border-[1px] border-zinc-950 bg-white p-1 pl-5 pr-5 font-normal text-zinc-900 shadow-md'
        >
            <input
                className='w-[130px] outline-none md:min-w-[230px]'
                type='text'
                name='search-input'
                placeholder={t('partials.search.placeholder') ?? 'Search...'}
                required
                minLength={2}
                maxLength={40}
            ></input>
            <button type='submit' aria-label='Search'>
                <IconSearch />
            </button>
        </form>
    );
});

export default Search;
