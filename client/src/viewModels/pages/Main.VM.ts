import { NavigateFunction } from 'react-router';
import { api } from '../../utils/utils';
import { action, makeAutoObservable } from 'mobx';
import { Recommendation } from '../../utils/types';

export class MainVM {
    private navigate: NavigateFunction;
    private api = api;
    public popularRecommendations: Array<Recommendation> = [];
    public recentRecommendations: Array<Recommendation> = [];
    constructor(navigate: NavigateFunction) {
        this.navigate = navigate;
        this.getRecentRecommendations();
        this.getPopularRecommendations();
        makeAutoObservable(this);
    }

    public handleGroupOnClick(value: string) {
        this.navigate(`/search/${value}`, { replace: true });
    }

    private getPopularRecommendations() {
        this.api.recommendations
            .getPopularRecommendations()
            .then(
                action((response) => {
                    this.popularRecommendations = response.data.recommendations;
                })
            )
            .catch(action((err) => console.log(err)));
    }

    private getRecentRecommendations() {
        this.api.recommendations
            .getRecentRecommendations()
            .then(
                action((response) => {
                    this.recentRecommendations = response.data.recommendations;
                })
            )
            .catch(action((err) => console.log(err)));
    }
}
