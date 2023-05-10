import { action, makeAutoObservable } from 'mobx';
import { Api } from '../../utils/HTTP/Api';
import { Recommendation } from '../../utils/types';

export class SearchResultsVM {
    public searchValue: string;
    private page: number = 1;
    private totalPages: number = 1;
    private api: Api;
    public recommendations: Array<Recommendation> = [];
    public isLoading: boolean = false;
    public hasMore = false;
    constructor(searchValue: string, api: Api) {
        this.searchValue = searchValue;
        this.api = api;

        // this.getSearchResults();
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
                    this.recommendations = this.recommendations.concat(
                        response.data.paginatedRecommendations.recommendations
                    );
                    this.totalPages =
                        response.data.paginatedRecommendations.totalPages;
                })
            )
            .catch(action((err) => console.log(err)))
            .finally(
                action(() => {
                    console.log(this.recommendations);
                    this.isLoading = false;
                    this.hasMore = this.page < this.totalPages ? true : false;
                })
            );
    }
}
