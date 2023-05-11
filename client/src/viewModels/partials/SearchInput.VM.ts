import { NavigateFunction } from 'react-router';

export class SearchInputVM {
    private navigate: NavigateFunction;

    constructor(navigate: NavigateFunction) {
        this.navigate = navigate;
    }

    public handleSearchButton(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const inputElement = e.currentTarget.elements.namedItem(
            'search-input'
        ) as HTMLInputElement;

        const searchValue = inputElement.value;

        this.navigate(`/search/${encodeURIComponent(searchValue)}`, {
            replace: true,
        });

        inputElement.value = '';
    }
}
