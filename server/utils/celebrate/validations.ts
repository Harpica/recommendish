import { Joi } from 'celebrate';

export const validator = {
    recommendation: {
        object: {
            body: {
                data: Joi.object()
                    .required()
                    .keys({
                        recommendation: Joi.object()
                            .required()
                            .keys({
                                owner: Joi.string().required().max(30),
                                name: Joi.string().required().min(2).max(40),
                                product: Joi.object().keys({
                                    _id: Joi.string().allow('').max(30),
                                    name: Joi.string(),
                                    group: Joi.string(),
                                }),
                                productRating: Joi.number().required(),
                                group: Joi.string().required(),
                                tags: Joi.array().required(),
                                body: Joi.string().required().min(10),
                                images: Joi.array(),
                            }),
                    }),
            },
        },
        toggleLike: {
            body: {
                data: Joi.object().keys({
                    user: Joi.string().required(),
                }),
            },
        },
        pagination: {
            params: Joi.object().keys({
                query: Joi.object().required().keys({
                    page: Joi.string().required(),
                    limit: Joi.string().required(),
                    value: Joi.string().required(),
                }),
            }),
        },
    },
    user: {
        object: {
            body: {
                data: Joi.object()
                    .required()
                    .keys({
                        name: Joi.string().required().min(3),
                        login: Joi.string().required(),
                        avatar: Joi.string(),
                    }),
            },
        },
    },
};
