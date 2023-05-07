import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import {
    Comment,
    CreateCommentData,
    CurrentUser,
    Recommendation,
    UserRole,
} from '../../utils/types';
import { DEFAULT_RECOMMENDATION } from '../../utils/constants';
import { AxiosResponse } from 'axios';

export class RecommendationVM {
    private api: Api = api;
    private recommendationId: string;
    public recommendation: Recommendation = DEFAULT_RECOMMENDATION;
    public comments: Array<Comment> = [];
    private latestUpdate: string = Date.now().toString();
    public isLoading: boolean = false;
    private userId: string;
    private userRole: UserRole;
    public notificationIsOpen: boolean = false;
    public notificationMessage: string = '';
    constructor(id: string, userId: string, userRole: UserRole) {
        this.recommendationId = id;
        this.userId = userId;
        this.userRole = userRole;
        this.setRecommendation = this.setRecommendation.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.getinitialData();
        makeAutoObservable(this);
    }
    private getinitialData() {
        this.isLoading = true;
        Promise.all([this.getRecommendation(), this.getComments()])
            .catch(action((err) => console.log(err)))
            .finally(
                action(() => {
                    this.isLoading = false;
                })
            );
    }
    private getRecommendation() {
        return this.api.recommendations
            .getRecommendationById(this.recommendationId)
            .then(action(this.setRecommendation));
    }

    private getComments() {
        return this.api.comments.getAll(this.recommendationId).then(
            action((response) => {
                this.comments = response.data.comments;
            })
        );
    }

    private getLatestComments() {
        this.api.comments
            .getLatest(this.recommendationId, this.latestUpdate)
            .then(
                action((response) => {
                    this.comments.concat(response.data.comments);
                    this.latestUpdate = Date.now().toString();
                })
            )
            .catch(
                action((err) => {
                    console.log(err);
                    this.openNotification('Something went wrong with network');
                })
            );
    }

    public setCommentUpdateInterval() {
        return setInterval(() => {
            this.getLatestComments();
        }, 5000);
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
            this.recommendation.likes.find((element) => this.userId === element)
        ) {
            this.dislike();
        } else {
            this.like();
        }
    }

    public checkIsAuth() {
        if (this.userRole === 'unauthorized') {
            return false;
        }
        return true;
    }

    private like() {
        this.api.recommendations
            .likeRecommendation(this.userId, this.recommendationId)
            .then(action(this.setRecommendation))
            .catch(action((err) => console.log(err)));
    }

    public checkIfLiked() {
        if (this.recommendation.likes.find((id) => this.userId === id)) {
            return true;
        }
        return false;
    }

    private dislike() {
        this.api.recommendations
            .dislikeRecommendation(this.userId, this.recommendationId)
            .then(action(this.setRecommendation))
            .catch(action((err) => console.log(err)));
    }

    public rateProduct(value: number) {
        if (!this.checkIsAuth()) {
            this.openNotification('Please authorize first');
            return;
        }
        this.api.products
            .updateRating(this.recommendation.product._id, this.userId, value)
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

    public createCommentFormHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const commentData: CreateCommentData = {
            owner: this.userId,
            recommendation: this.recommendationId,
            body: (
                e.currentTarget.elements.namedItem(
                    'comment-body'
                ) as HTMLInputElement
            ).value,
        };
        this.api.comments
            .createComment(commentData)
            .then(
                action((response) => {
                    this.comments.push(response.data.comment);
                })
            )
            .catch(
                action((err) => {
                    console.log(err);
                    this.openNotification(
                        'Something went wrong. Please try again.'
                    );
                })
            );
    }

    public isUserOwner() {
        return (
            this.recommendation.owner._id === this.userId ||
            this.userRole === 'admin'
        );
    }
}
