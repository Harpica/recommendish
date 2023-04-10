import { NextFunction, Request, Response } from 'express';
import { Recommendation } from '../models/recommendation';
import { Error, Types } from 'mongoose';
import { removeRecommendationFromTag, updateOrCreateTag } from './tags';
import { Tag } from '../models/tag';
import {
    handleIfDocumentNotFound,
    incorrectDataHandler,
    sendDocumentIfFound,
} from '../utils/utils';
import {
    addRecommendationToUser,
    removeRecommendationFromUser,
    setUserLikes,
} from './users';
import { updateOrCreateProduct } from './product';
// import { withResponse } from '../utils/utils';

export const getRecentRecommendations = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    Recommendation.find({})
        .sort({ createdAt: 1 })
        .limit(1)
        .populate([
            { path: 'owner', select: 'name likes _id avatar' },
            'product',
            'tags',
        ])
        .then((recommendations) => {
            res.send({ data: recommendations });
        })
        .catch(next);
};

export const getPopularRecommendations = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    Recommendation.aggregate([
        {
            $addFields: { likesCount: { $size: { $ifNull: ['$likes', []] } } },
        },
        {
            $sort: { likesCount: -1 },
        },
        {
            $lookup: {
                from: 'tags',
                localField: 'tags',
                foreignField: '_id',
                as: 'tags',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner',
            },
        },
        {
            $project: {
                'owner.theme': 0,
                'owner.language': 0,
                'owner.role': 0,
                'owner.status': 0,
                'owner.recommendations': 0,
            },
        },
    ])
        .limit(20)
        .then((recommendations) => {
            res.send({ data: recommendations });
        })
        .catch(next);
};

export const getPaginatedRecommendations = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);
        const recommendations = await Recommendation.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .populate([
                { path: 'owner', select: 'name likes _id avatar' },
                'product',
                'tags',
            ]);

        const count = await Recommendation.countDocuments();

        res.send({
            data: {
                recommendations: recommendations,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const createRecommendation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const recommendData = req.body.data;
    try {
        if (!recommendData.product._id) {
            const productId = await updateOrCreateProduct(
                recommendData.product.name,
                recommendData.group
            );
            recommendData.product._id = productId;
            console.log(productId);
        }
        const recommendation = await Recommendation.create({
            ...recommendData,
            product: recommendData.product._id,
            tags: [],
        });
        addRecommendationToUser(recommendation.owner, recommendation._id);
        const tagIds = await addRecommendationToTags(
            recommendData.tags,
            recommendation._id
        );
        const updatedRecommendation = await addTagsToRecommendation(
            recommendation._id,
            tagIds
        ).populate([
            'product',
            { path: 'owner', select: 'name avatar likes' },
            { path: 'tags', select: 'name' },
        ]);

        res.send({ data: updatedRecommendation });
    } catch (err: unknown) {
        if (err instanceof Error) {
            incorrectDataHandler(
                err,
                next,
                'Incorrect data for recommendation creation'
            );
        }
    }
};

const addRecommendationToTags = async (
    tags: Array<typeof Tag>,
    recommendationId: string | Types.ObjectId
) => {
    return Promise.all(
        tags.map(async (tag) => {
            return await updateOrCreateTag(tag.name, recommendationId);
        })
    );
};

const addTagsToRecommendation = (
    id: Types.ObjectId,
    tagIds: Array<Types.ObjectId>
) => {
    return Recommendation.findByIdAndUpdate(
        id,
        { $addToSet: { tags: tagIds } },
        { new: true, useFindAndModify: false }
    );
};

export const updateRecommendation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let recommendData = req.body.data;
        const id = req.params.id;
        const tagsId = await addRecommendationToTags(recommendData.tags, id);
        const recommendation = await Recommendation.findByIdAndUpdate(
            id,
            {
                ...recommendData,
                product: recommendData.product._id,
                tags: tagsId,
            },
            { new: true }
        ).populate([
            'product',
            { path: 'owner', select: 'name avatar likes' },
            { path: 'tags', select: 'name' },
        ]);
        sendDocumentIfFound(recommendation, res);
    } catch (err: unknown) {
        if (err instanceof Error) {
            incorrectDataHandler(
                err,
                next,
                'Incorrect data for recommendation update'
            );
        }
    }
};

export const deleteRecommendation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    Recommendation.findByIdAndDelete(id)
        .then((recommendation) => {
            handleIfDocumentNotFound(recommendation);
            removeRecommendationFromTag(
                recommendation!.tags,
                recommendation!._id
            );
            removeRecommendationFromUser(
                recommendation!.owner,
                recommendation!._id
            );
            res.send({ data: recommendation });
        })
        .catch((err) => {
            incorrectDataHandler(
                err,
                next,
                'Incorrect _id for recommendation deletion'
            );
        });
};

export const likeRecommendation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const userId = req.body.data.userId;
    Recommendation.findByIdAndUpdate(
        id,
        {
            $addToSet: { likes: userId },
        },
        { new: true, useFindAndModify: false }
    )
        .then((recommendation) => {
            setUserLikes(userId, next);
            sendDocumentIfFound(recommendation, res);
        })
        .catch((err) => {
            incorrectDataHandler(
                err,
                next,
                'Incorrect _id for like recommendation'
            );
        });
};
export const dislikeRecommendation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const userId = req.body.data.userId;
    Recommendation.findByIdAndUpdate(
        id,
        {
            $pull: { likes: userId },
        },
        { new: true, useFindAndModify: false }
    )
        .then((recommendation) => {
            setUserLikes(userId, next);
            sendDocumentIfFound(recommendation, res);
        })
        .catch((err) => {
            incorrectDataHandler(
                err,
                next,
                'Incorrect _id for dislike recommendation'
            );
        });
};

export const getRecommendationById = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    Recommendation.findById(id)
        .populate([
            { path: 'owner', select: 'name likes _id avatar' },
            'product',
            'tags',
            {
                path: 'comments',
                populate: { path: 'owner', select: 'name likes _id avatar' },
            },
        ])
        .then((recommendation) => sendDocumentIfFound(recommendation, res))
        .catch((err) => {
            incorrectDataHandler(err, next, 'Incorrect _id');
        });
};

export const addCommentToRecommendation = async (
    recommendationId: Types.ObjectId,
    commentId: Types.ObjectId
) => {
    return await Recommendation.findByIdAndUpdate(recommendationId, {
        $addToSet: { comments: commentId },
    });
};
