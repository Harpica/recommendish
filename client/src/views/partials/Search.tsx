import { useMemo } from 'react';
import IconSearch from '../svgWrappers/IconSearch';
import { SearchInputVM } from '../../viewModels/SearchInput.VM';
import { useNavigate } from 'react-router';

const Search = () => {
    const navigate = useNavigate();
    const vm = useMemo(() => new SearchInputVM(navigate), []);
    return (
        <form
            onSubmit={(e) => {
                vm.handleSearchButton(e);
            }}
            className=' bg-white font-normal rounded-full p-1 pr-5 pl-5 flex flex-row shadow-md border-zinc-950 border-[1px] text-zinc-900'
        >
            <input
                className='outline-none w-[130px] md:min-w-[230px]'
                type='text'
                name='search-input'
                placeholder='Search...'
                required
                minLength={2}
                maxLength={40}
            ></input>
            <button type='submit' aria-label='Search' className=''>
                <IconSearch />
            </button>
        </form>
    );
};

export default Search;
