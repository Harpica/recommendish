import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import {
    CurrentUser,
    Recommendation,
    RecommendationCreateOrEditData,
    Tag,
} from '../../utils/types';
import Joi from 'joi';
import { DEFAULT_RECOMMENDATION, ROUTES } from '../../utils/constants';
import { NavigateFunction } from 'react-router';

export class RecommendationFormVM {
    private currentUser: CurrentUser;
    public recommendation: Recommendation = DEFAULT_RECOMMENDATION;
    private api: Api = api;
    private navigate: NavigateFunction;
    public recommendationSchema = Joi.object({
        title: Joi.string().required().min(2).max(40).messages({
            'string.empty': 'This field is required',
            'string.min': 'Minimun length is 2',
            'string.max': 'Maximun length is 40',
        }),
        group: Joi.string().required().messages({
            'string.empty': 'This field is required',
        }),
        product: Joi.object({
            name: Joi.string().required().min(3),
        })
            .required()
            .unknown()
            .messages({
                'object.base': 'This field is required',
                'string.empty': 'This field is required',
                'string.min': 'Minimun length is 3',
            }),
        tags: Joi.array()
            .items(
                Joi.object({
                    name: Joi.string().min(3),
                })
                    .unknown()
                    .required()
            )
            .required()
            .messages({
                'array.includesRequiredUnknowns':
                    'This field is required and minimum length of tag is 3',
            }),
        rating: Joi.number().required().messages({
            'number.base': 'This field is required',
        }),
        body: Joi.string().required().min(10).messages({
            'string.min': 'Minimun length is 10',
        }),
    });
    public hookFormDefaultValues;
    public images: Array<{ url: string; publicId: string }> = [];
    constructor(
        navigate: NavigateFunction,
        currentUser: CurrentUser,
        type: 'new' | 'edit',
        recommendationId?: string
    ) {
        this.navigate = navigate;
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
        this.deleteImage = this.deleteImage.bind(this);
        makeAutoObservable(this);
    }

    private getRecommendation(recommendationId: string) {
        this.api.recommendations
            .getRecommendationById(recommendationId)
            .then(
                action((response) => {
                    this.recommendation = response.data.recommendation;
                    this.images = [...this.recommendation.images];
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
                            this.images.push(response.data.image);
                        })
                    )
                    .catch((err) => console.log(err));
            };
            reader.readAsDataURL(file);
        });
    }

    public deleteImage(id: string) {
        console.log(id);
        this.api.images
            .deleteImage(id)
            .then(
                action((response) => {
                    this.images = this.images.filter(
                        (image) => image.publicId !== id
                    );
                })
            )
            .catch((err) => console.log(err));
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
            tags: data.tags,
            productRating: data.rating,
            body: data.body,
            images: this.images,
        };
    }

    private createRecommendation(data: RecommendationCreateOrEditData) {
        this.api.recommendations
            .createRecommendation(data)
            .then((response) =>
                this.navigateToRecommendationPage(
                    response.data.recommendation._id
                )
            )
            .catch((err) => console.log(err));
    }

    private updateRecommendation(data: RecommendationCreateOrEditData) {
        this.api.recommendations
            .updateRecommendation(this.recommendation._id, data)
            .then((response) =>
                this.navigateToRecommendationPage(
                    response.data.recommendation._id
                )
            )
            .catch((err) => console.log(err));
    }

    private navigateToRecommendationPage(id: string) {
        this.navigate(ROUTES(id).recommendationById, { replace: true });
    }
}
