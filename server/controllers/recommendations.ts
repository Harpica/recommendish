import { NextFunction, Request, Response } from 'express';
import { IRecommendation, Recommendation } from '../models/recommendation';
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
import { createProduct, updateProduct } from './product';
import { Comment } from '../models/comment';
import { IUser } from '../models/user';
import { deleteCommentsWithRecommendation } from './comments';

export const getRecentRecommendations = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    Recommendation.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .select(['-owner_name', '-product_name', '-tags_names'])
        .populate([
            { path: 'owner', select: 'name likes _id avatar' },
            'product',
            'tags',
        ])
        .then((recommendations) => {
            res.send({ recommendations: recommendations });
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
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'product',
            },
        },
        { $unwind: '$product' },
        { $unwind: '$owner' },
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
        .limit(5)
        .then((recommendations) => {
            res.send({ recommendations: recommendations });
        })
        .catch(next);
};

export const findRecommendations = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);
        const searchString = req.query.value as string;
        console.log(page, limit, searchString);

        const comments = await Comment.find({
            $text: { $search: searchString },
        });

        const recommendationsIds = comments.map((comment) => {
            return comment.recommendation;
        });

        console.log(recommendationsIds);

        const recommendations = await Recommendation.aggregate([
            {
                $match: {
                    $or: [
                        { $text: { $search: searchString } },
                        {
                            _id: {
                                $in: recommendationsIds,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: 'comments',
                    foreignField: '_id',
                    as: 'comments',
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
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            {
                $lookup: {
                    from: 'tags',
                    localField: 'tags',
                    foreignField: '_id',
                    as: 'tags',
                },
            },
            { $unwind: '$product' },
            { $unwind: '$owner' },
            {
                $project: {
                    owner_name: 0,
                    product_name: 0,
                    tags_names: 0,
                    'owner.theme': 0,
                    'owner.language': 0,
                    'owner.role': 0,
                    'owner.status': 0,
                    'owner.recommendations': 0,
                },
            },
        ])
            .sort({ score: { $meta: 'textScore' } })
            .limit(limit)
            .skip((page - 1) * limit);

        console.log(recommendations);

        const count = recommendations.length;

        res.send({
            paginatedRecommendations: {
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
    const recommendData = req.body.data.recommendation;
    try {
        if (recommendData.product._id === '') {
            const productId = await createProduct(
                recommendData.product.name,
                recommendData.group
            );
            recommendData.product._id = productId;
            console.log(productId);
        } else {
            updateProduct(recommendData.product.name, recommendData.group);
        }
        const recommendation = await Recommendation.create({
            ...recommendData,
            owner_name: recommendData.owner.name,
            product_name: recommendData.product.name,
            tags_names: recommendData.tags.map((tag: typeof Tag) => tag.name),
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
        )
            .populate([
                'product',
                { path: 'owner', select: 'name _id avatar likes' },
            ])
            .select(['-owner_name', '-product_name', '-tags_names']);

        res.send({ recommendation: updatedRecommendation });
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
        let recommendData = req.body.data.recommendation;
        const id = req.params.id;
        const tagsId = await addRecommendationToTags(recommendData.tags, id);
        if (recommendData.product._id === '') {
            const productId = await createProduct(
                recommendData.product.name,
                recommendData.group
            );
            recommendData.product._id = productId;
            console.log(productId);
        } else {
            updateProduct(recommendData.product.name, recommendData.group);
        }
        const recommendation = await Recommendation.findByIdAndUpdate(
            id,
            {
                ...recommendData,
                owner_name: recommendData.owner.name,
                product_name: recommendData.product.name,
                tags_names: recommendData.tags.map(
                    (tag: typeof Tag) => tag.name
                ),
                product: recommendData.product._id,
                tags: tagsId,
            },
            { new: true }
        )
            .select(['-owner_name', '-product_name', '-tags_names'])
            .populate([
                'product',
                { path: 'owner', select: 'name avatar likes' },
                { path: 'tags', select: 'name' },
            ]);
        sendDocumentIfFound(recommendation, res, 'recommendation');
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
            deleteCommentsWithRecommendation(recommendation!._id, next);
            res.send({ recommendation: recommendation });
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
    const userId = req.body.data.user;
    Recommendation.findByIdAndUpdate(
        id,
        {
            $addToSet: { likes: userId },
        },
        { new: true, useFindAndModify: false }
    )
        .select(['-owner_name', '-product_name', '-tags_names'])
        .populate<{ owner: IUser }>([
            'product',
            { path: 'owner', select: 'name avatar likes' },
            { path: 'tags', select: 'name' },
        ])
        .then(async (recommendation) => {
            handleIfDocumentNotFound(recommendation);
            if (recommendation) {
                recommendation.owner.likes += 1;
                setUserLikes(recommendation.owner._id, next);
                res.send({ recommendation: recommendation });
            }
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
    const userId = req.body.data.user;
    Recommendation.findByIdAndUpdate(
        id,
        {
            $pull: { likes: userId },
        },
        { new: true, useFindAndModify: false }
    )
        .select(['-owner_name', '-product_name', '-tags_names'])
        .populate<{ owner: IUser }>([
            'product',
            { path: 'owner', select: 'name avatar _id likes' },
            { path: 'tags', select: 'name' },
        ])
        .then(async (recommendation) => {
            handleIfDocumentNotFound(recommendation);
            if (recommendation) {
                recommendation.owner.likes = recommendation.owner.likes - 1;
                setUserLikes(recommendation.owner._id, next);
                res.send({ recommendation: recommendation });
            }
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
        .select(['-owner_name', '-product_name', '-tags_names'])
        .populate([
            { path: 'owner', select: 'name likes _id avatar' },
            'product',
            'tags',
            {
                path: 'comments',
                populate: { path: 'owner', select: 'name likes _id avatar' },
            },
        ])
        .then((recommendation) =>
            sendDocumentIfFound(recommendation, res, 'recommendation')
        )
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
