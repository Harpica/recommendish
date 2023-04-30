import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import { CurrentUser, Recommendation } from '../../utils/types';

export class RecommendationsTableVM {
    private currentUser: CurrentUser;
    private api: Api = api;
    public recommendations: Array<Recommendation> = [];
    constructor(user: CurrentUser) {
        this.currentUser = user;
        this.handleDeleteRecommendation =
            this.handleDeleteRecommendation.bind(this);
        this.getUserRecommendation();
        makeAutoObservable(this);
    }

    private getUserRecommendation() {
        if (this.currentUser.role !== 'unauthorized') {
            this.api.users
                .getUserRecommendations(this.currentUser._id)
                .then(
                    action(
                        (response) =>
                            (this.recommendations =
                                response.data.recommendations)
                    )
                )
                .catch((err) => console.log(err));
        }
    }

    public handleDeleteRecommendation(id: string) {
        this.api.recommendations
            .deleteRecommendation(id)
            .then(
                action(
                    (response) =>
                        (this.recommendations = this.recommendations.filter(
                            (recommendation) =>
                                recommendation._id !==
                                response.data.recommendation._id
                        ))
                )
            )
            .catch((err) => console.log(err));
    }
}
