import { Joi } from 'celebrate';

export const validator = {
    recommendation: {
        object: {
            body: {
                data: Joi.object()
                    .required()
                    .keys({
                        owner: Joi.string().required().max(30),
                        name: Joi.string().required().min(2).max(40),
                        product: Joi.object().keys({
                            _id: Joi.string().max(30),
                            name: Joi.string(),
                        }),
                        productRating: Joi.number().required(),
                        group: Joi.string().required(),
                        tags: Joi.array().required(),
                        boby: Joi.string().required().min(10),
                        images: Joi.array(),
                        likes: Joi.array(),
                        comments: Joi.array(),
                    }),
            },
        },
        toggleLike: {
            body: {
                data: Joi.object().required().keys({
                    user: Joi.string().required(),
                }),
            },
        },
        pagination: {
            params: Joi.object().keys({
                query: Joi.object().required().keys({
                    page: Joi.string().required(),
                    limit: Joi.string().required(),
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
                        email: Joi.string().required().email(),
                        avatar: Joi.string(),
                    }),
            },
        },
    },
};
