import { NavigateFunction } from 'react-router';

export class SearchInputVM {
    private navigate: NavigateFunction;
    constructor(navigate: NavigateFunction) {
        this.navigate = navigate;
    }

    public handleSearchButton(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const searchValue = (
            e.currentTarget.elements.namedItem(
                'search-input'
            ) as HTMLInputElement
        ).value;
        this.navigate(`/search/${searchValue}`, { replace: true });
        (
            e.currentTarget.elements.namedItem(
                'search-input'
            ) as HTMLInputElement
        ).value = '';
    }
}
