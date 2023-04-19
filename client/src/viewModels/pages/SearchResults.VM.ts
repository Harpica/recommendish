import { action, makeAutoObservable } from 'mobx';
import { Api } from '../../utils/HTTP/Api';
import { Recommendation } from '../../utils/types';

export class SearchResultsVM {
    public searchValue: string;
    private api: Api;
    public recommendations: Array<Recommendation> = [];
    public isLoading: boolean = false;
    constructor(searchValue: string, api: Api) {
        this.searchValue = searchValue;
        this.api = api;
        this.getSearchResults('1');
        makeAutoObservable(this);
    }

    getSearchResults(page: string) {
        this.isLoading = true;
        this.api.recommendations
            .getSearchResults([
                { key: 'value', value: this.searchValue },
                { key: 'page', value: page },
                { key: 'limit', value: '10' },
            ])
            .then(
                action((response) => {
                    this.recommendations =
                        response.data.paginatedRecommendations.recommendations;
                })
            )
            .catch(action((err) => console.log(err)))
            .finally(action(() => (this.isLoading = false)));
    }
}
