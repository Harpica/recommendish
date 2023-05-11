import { action, makeAutoObservable } from 'mobx';
import { Recommendation } from '../../utils/types';
import { api } from '../../utils/utils';

export class SearchResultsVM {
    public searchValue: string;
    public recommendations: Array<Recommendation> = [];
    public isLoading: boolean = false;
    public hasMore = false;

    private page: number = 1;
    private totalPages: number = 1;
    private api = api;

    constructor(searchValue: string) {
        this.searchValue = searchValue;
        this.getSearchResults = this.getSearchResults.bind(this);
        makeAutoObservable(this);
    }

    public getInitialData() {
        this.getSearchResults();
    }

    public getNextData() {
        this.page++;
        this.getSearchResults();
    }

    private getSearchResults() {
        this.isLoading = true;
        this.api.recommendations
            .getSearchResults([
                { key: 'value', value: this.searchValue },
                { key: 'page', value: this.page.toString() },
                { key: 'limit', value: '5' },
            ])
            .then(
                action((response) => {
                    this.recommendations.push(
                        ...response.data.paginatedRecommendations
                            .recommendations
                    );

                    this.totalPages =
                        response.data.paginatedRecommendations.totalPages;
                })
            )
            .catch(action((err) => console.log(err)))
            .finally(
                action(() => {
                    this.isLoading = false;
                    this.hasMore = this.page < this.totalPages ? true : false;
                })
            );
    }
}
