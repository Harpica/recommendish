import { action, makeAutoObservable } from 'mobx';
import { api } from '../../utils/utils';
import { Recommendation, UserRole } from '../../utils/types';

export class RecommendationsTableVM {
    private userId: string;
    private userRole: UserRole;
    private api = api;
    public recommendations: Array<Recommendation> = [];
    public currentRecommendationId: string = '';
    public isSurePopupOpen: boolean = false;
    public closePopup: () => void;

    constructor(userId: string, userRole: UserRole) {
        this.userId = userId;
        this.userRole = userRole;
        this.handleDeleteRecommendation =
            this.handleDeleteRecommendation.bind(this);
        this.closePopup = () => (this.isSurePopupOpen = false);
        this.getUserRecommendation();
        makeAutoObservable(this);
    }

    private getUserRecommendation() {
        if (this.userRole !== 'unauthorized') {
            this.api.users
                .getUserRecommendations(this.userId)
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

    public handleDeleteButtonClick(id: string) {
        this.isSurePopupOpen = true;
        this.currentRecommendationId = id;
    }

    public handleDeleteRecommendation() {
        this.api.recommendations
            .deleteRecommendation(this.currentRecommendationId)
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
            .catch((err) => console.log(err))
            .finally(() => this.closePopup());
    }
}
