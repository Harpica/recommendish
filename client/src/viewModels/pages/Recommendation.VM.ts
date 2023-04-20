import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import { CurrentUser, Recommendation } from '../../utils/types';
import { DEFAULT_RECOMMENDATION } from '../../utils/constants';
import { AxiosResponse } from 'axios';

export class RecommendationVM {
    private api: Api = api;
    private recommendationId: string;
    public recommendation: Recommendation = DEFAULT_RECOMMENDATION;
    public isLoading: boolean = false;
    private currentUser: CurrentUser;
    public notificationIsOpen: boolean = false;
    public notificationMessage: string = '';
    constructor(id: string, currentUser: CurrentUser) {
        this.recommendationId = id;
        this.currentUser = currentUser;
        this.setRecommendation = this.setRecommendation.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.getRecommendation();
        makeAutoObservable(this);
    }

    private getRecommendation() {
        this.isLoading = true;
        this.api.recommendations
            .getRecommendationById(this.recommendationId)
            .then(action(this.setRecommendation))
            .catch(action((err) => console.log(err)))
            .finally(action(() => (this.isLoading = false)));
    }

    private setRecommendation(response: AxiosResponse) {
        this.recommendation = { ...response.data.recommendation };
    }

    public handleToggleLike() {
        if (!this.checkIsAuth()) {
            this.openNotification('Please authorize first');
            return;
        }
        if (
            this.recommendation.likes.find(
                (element) => this.currentUser._id === element
            )
        ) {
            this.dislike();
        } else {
            this.like();
        }
    }

    public checkIsAuth() {
        if (this.currentUser.role === 'unauthorized') {
            return false;
        }
        return true;
    }

    private like() {
        this.api.recommendations
            .likeRecommendation(this.currentUser._id, this.recommendationId)
            .then(action(this.setRecommendation))
            .catch(action((err) => console.log(err)));
    }

    public checkIfLiked() {
        if (
            this.recommendation.likes.find((id) => this.currentUser._id === id)
        ) {
            return true;
        }
        return false;
    }

    private dislike() {
        this.api.recommendations
            .dislikeRecommendation(this.currentUser._id, this.recommendationId)
            .then(action(this.setRecommendation))
            .catch(action((err) => console.log(err)));
    }

    public rateProduct(value: number) {
        if (!this.checkIsAuth()) {
            this.openNotification('Please authorize first');
            return;
        }
        this.api.products
            .updateRating(
                this.recommendation.product._id,
                this.currentUser._id,
                value
            )
            .then(
                action((response) => {
                    this.recommendation.product = response.data.product;
                })
            )
            .catch(action((err) => console.log(err)));
    }

    public openNotification(message: string) {
        this.notificationIsOpen = true;
        this.notificationMessage = message;
    }

    public closeNotification() {
        this.notificationIsOpen = false;
    }
}
