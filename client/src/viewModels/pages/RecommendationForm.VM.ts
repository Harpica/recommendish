import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import {
    Recommendation,
    RecommendationCreateOrEditData,
} from '../../utils/types';
import Joi from 'joi';
import { DEFAULT_RECOMMENDATION, ROUTES } from '../../utils/constants';
import { NavigateFunction } from 'react-router';
import i18n from '../../localization/i18n';

export class RecommendationFormVM {
    private userId: string;
    public recommendation: Recommendation = DEFAULT_RECOMMENDATION;
    private api: Api = api;
    private navigate: NavigateFunction;
    public recommendationSchema: Joi.ObjectSchema<any> = Joi.object();
    public hookFormDefaultValues;
    public images: Array<{ url: string; publicId: string }> = [];
    constructor(
        navigate: NavigateFunction,
        userId: string,
        type: 'new' | 'edit',
        recommendationId?: string
    ) {
        console.log('I created');
        this.navigate = navigate;
        this.userId = userId;
        this.setRecommendationSchema();
        this.hookFormDefaultValues = {
            title: this.recommendation.name,
            group: this.recommendation.group,
            product: this.recommendation.product,
            tags: this.recommendation.tags,
            rating: this.recommendation.productRating,
            body: i18n.t('defaultRecommendationBody'),
        };
        if (type === 'edit' && recommendationId) {
            this.getRecommendation(recommendationId);
        }
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        makeAutoObservable(this);
    }

    public setRecommendationSchema() {
        this.recommendationSchema = Joi.object({
            title: Joi.string()
                .required()
                .min(2)
                .max(40)
                .messages({
                    'string.empty': i18n.t('form.errors.required'),
                    'string.min': i18n.t('form.errors.minLength', {
                        length: 2,
                    }),
                    'string.max': i18n.t('form.errors.maxLength', {
                        length: 40,
                    }),
                }),
            group: Joi.string()
                .required()
                .messages({
                    'string.empty': i18n.t('form.errors.required'),
                }),
            product: Joi.object({
                name: Joi.string().required().min(3),
            })
                .required()
                .unknown()
                .messages({
                    'object.base': i18n.t('form.errors.required'),
                    'string.empty': i18n.t('form.errors.required'),
                    'string.min': i18n.t('form.errors.minLength', {
                        length: 3,
                    }),
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
                    'array.includesRequiredUnknowns': i18n.t('form.errors.tag'),
                }),
            rating: Joi.number()
                .required()
                .messages({
                    'number.base': i18n.t('form.errors.required'),
                }),
            body: Joi.string()
                .required()
                .min(10)
                .messages({
                    'string.min': i18n.t('form.errors.minLength', {
                        length: 10,
                    }),
                }),
        });
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
            owner: this.userId,
            name: data.title,
            group: data.group,
            product: {
                _id: data.product._id ?? '',
                name: data.product.name,
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
