import { NextFunction, Request, Response } from 'express';
import { IRecommendation, Recommendation } from '../models/recommendation';
import mongoose, { Error, Types } from 'mongoose';
import BadRequestError from '../utils/errors/BadRequestError';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import { updateOrCreateTag } from './tags';
import { Tag } from '../models/tag';
import { incorrectDataHandler, sendDocumentIfFound } from '../utils/utils';
import { setUserLikes } from './users';
// import { withResponse } from '../utils/utils';

export const getRecentRecommendations = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    Recommendation.find({})
        .sort({ createdAt: -1 })
        .limit(10)
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
    Recommendation.find({})
        .sort({ 'likes.length': -1 })
        .limit(10)
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
        const recommendation = await Recommendation.create(recommendData);
        const tagIds = await addRecommendationToTags(
            recommendData.tags,
            recommendation._id
        );
        const updatedRecommendation = await addTagsToRecommendation(
            recommendation._id,
            tagIds
        );
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
        recommendData.tags = tagsId;
        const recommendation = await Recommendation.findByIdAndUpdate(
            id,
            recommendData
        );
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
        .then((recommendation) => sendDocumentIfFound(recommendation, res))
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
    const id = req.body.data.id;
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
