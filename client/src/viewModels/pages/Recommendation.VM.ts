import { action, makeAutoObservable } from 'mobx';
import { api } from '../../utils/utils';
import {
    Comment,
    CreateCommentData,
    Recommendation,
    UserRole,
} from '../../utils/types';
import { DEFAULT_RECOMMENDATION } from '../../utils/constants';
import { AxiosResponse } from 'axios';
import jsPDF from 'jspdf';
import { MutableRefObject } from 'react';
import { toPng } from 'html-to-image';

export class RecommendationVM {
    public recommendation: Recommendation = DEFAULT_RECOMMENDATION;
    public comments: Array<Comment> = [];
    public isLoading: boolean = false;
    public notificationIsOpen: boolean = false;
    public notificationMessage: string = '';
    public isImageOpen: boolean = false;
    public currentImage: string = '';

    private api = api;
    private recommendationId: string;
    private latestUpdate: string = Date.now().toString();
    private userId: string;
    private userRole: UserRole;

    constructor(id: string, userId: string, userRole: UserRole) {
        this.recommendationId = id;
        this.userId = userId;
        this.userRole = userRole;
        this.setRecommendation = this.setRecommendation.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.closeImagePopup = this.closeImagePopup.bind(this);
        this.createCommentFormHandler =
            this.createCommentFormHandler.bind(this);
        this.getinitialData();
        makeAutoObservable(this);
    }

    private getinitialData() {
        this.isLoading = true;
        Promise.all([this.getRecommendation(), this.getComments()])
            .catch(action((err) => console.log(err)))
            .finally(action(() => (this.isLoading = false)));
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
                    this.comments.push(...response.data.comments);
                    this.latestUpdate = Date.now().toString();
                })
            )
            .catch(
                action((err) => {
                    this.openNotification('Something went wrong with network');
                })
            );
    }

    public setCommentUpdateInterval() {
        return setInterval(() => this.getLatestComments(), 5000);
    }

    private setRecommendation(response: AxiosResponse) {
        this.recommendation = { ...response.data.recommendation };
    }

    public handleToggleLike() {
        if (!this.checkIsAuth()) {
            this.openNotification('Please authorize first');
            return;
        }

        const liked =
            this.recommendation.likes.find(
                (element) => this.userId === element
            ) !== undefined;

        if (liked) {
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

    public openImagePopup(imageUrl: string) {
        this.isImageOpen = true;
        this.currentImage = imageUrl;
    }

    public closeImagePopup() {
        this.isImageOpen = false;
        this.currentImage = '';
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
        const form = e.currentTarget;

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
                action((response) => this.comments.push(response.data.comment))
            )
            .catch(
                action((err) => {
                    console.log(err);
                    this.openNotification(
                        'Something went wrong. Please try again.'
                    );
                })
            )
            .finally(() => form.reset());
    }

    public isUserOwner() {
        return (
            this.recommendation.owner._id === this.userId ||
            this.userRole === 'admin'
        );
    }

    public async handleLoadPdf(ref: MutableRefObject<null>) {
        if (ref.current) {
            const isDark = document
                .getElementById('root')
                ?.classList.contains('dark')
                ? true
                : false;

            toPng(ref.current, {
                cacheBust: true,
                backgroundColor: isDark ? 'rgb(39 39 42)' : 'rgb(248 250 252)',
            })
                .then(this.saveImageAsPdf)
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    private saveImageAsPdf(imageUrl: string) {
        const pdfDoc = new jsPDF({
            format: 'a4',
            unit: 'px',
        });

        const imgProperties = pdfDoc.getImageProperties(imageUrl);
        const pdfWidth = pdfDoc.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        pdfDoc.addImage(imageUrl, 'PNG', 15, 15, pdfWidth - 30, pdfHeight);

        pdfDoc.save('recommendation.pdf');
    }
}
