import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import {
    CurrentUser,
    Recommendation,
    RecommendationCreateOrEditData,
    Tag,
} from '../../utils/types';
import Joi from 'joi';
import { DEFAULT_RECOMMENDATION } from '../../utils/constants';

export class RecommendationFormVM {
    private currentUser: CurrentUser;
    public recommendation: Recommendation = DEFAULT_RECOMMENDATION;
    private api: Api = api;
    public recommendationSchema = Joi.object({
        title: Joi.string().required().min(2).max(40),
        group: Joi.string().required(),
        product: Joi.object({
            name: Joi.string().required().min(3),
        })
            .required()
            .unknown(),
        tags: Joi.array().required(),
        rating: Joi.number().required(),
        body: Joi.string().required().min(10),
    });
    public hookFormDefaultValues;
    public imageUrls: Array<string> = [];
    constructor(
        currentUser: CurrentUser,
        type: 'new' | 'edit',
        recommendationId?: string
    ) {
        this.currentUser = currentUser;
        this.hookFormDefaultValues = {
            title: this.recommendation.name,
            group: this.recommendation.group,
            product: this.recommendation.product,
            tags: this.recommendation.tags,
            rating: this.recommendation.productRating,
            body: this.recommendation.body,
        };
        if (type === 'edit' && recommendationId) {
            this.getRecommendation(recommendationId);
        }
        this.handleFileUpload = this.handleFileUpload.bind(this);
        makeAutoObservable(this);
    }

    private getRecommendation(recommendationId: string) {
        this.api.recommendations
            .getRecommendationById(recommendationId)
            .then(
                action((response) => {
                    this.recommendation = response.data.recommendation;
                    this.hookFormDefaultValues = {
                        title: this.recommendation.name,
                        group: this.recommendation.group,
                        product: this.recommendation.product,
                        tags: this.recommendation.tags,
                        rating: this.recommendation.productRating,
                        body: this.recommendation.body,
                    };
                })
            )
            .catch((err) => console.log(err));
    }

    public handleFileUpload(files: FileList) {
        Array.from(files).forEach((file: Blob) => {
            const reader = new FileReader();
            console.log('file');
            reader.onload = (e) => {
                this.api.images
                    .uploadImage(e.target?.result)
                    .then(
                        action((response) => {
                            this.imageUrls.push(response.data.imageUrl);
                        })
                    )
                    .catch((err) => console.log(err));
            };
            reader.readAsDataURL(file);
        });
    }

    public onValidationSuccess(
        data: { [x: string]: any },
        type: 'new' | 'edit'
    ) {
        const recommendationData: RecommendationCreateOrEditData =
            this.getRecommendationData(data);
        if (type === 'new') {
            this.createRecommendation(recommendationData);
        } else {
            this.updateRecommendation(recommendationData);
        }
    }

    public onValidationFailure(errors: unknown) {
        console.log('errors', errors);
    }

    private getRecommendationData(data: {
        [x: string]: any;
    }): RecommendationCreateOrEditData {
        return {
            owner: this.currentUser._id,
            name: data.title,
            group: data.group,
            product: {
                _id: data.product._id ?? '',
                name:
                    typeof data.product === 'string'
                        ? data.product
                        : data.product.name,
                group: data.group,
            },
            tags: data.tags.map((tag: Tag | string) => {
                if (typeof tag === 'string') {
                    return { name: tag };
                }
                return tag;
            }),
            productRating: data.rating,
            body: data.body,
            images: [...this.recommendation.images, ...this.imageUrls],
        };
    }

    private createRecommendation(data: RecommendationCreateOrEditData) {
        this.api.recommendations
            .createRecommendation(data)
            .then((response) => console.log(response.data.recommendation))
            .catch((err) => console.log(err));
    }

    private updateRecommendation(data: RecommendationCreateOrEditData) {
        this.api.recommendations
            .updateRecommendation(this.recommendation._id, data)
            .then((response) => console.log(response.data.recommendation))
            .catch((err) => console.log(err));
    }
}