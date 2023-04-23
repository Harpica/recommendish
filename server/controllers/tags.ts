import { NextFunction, Request, Response } from 'express';
import { Tag } from '../models/tag';
import { ObjectId, Types } from 'mongoose';

export const updateOrCreateTag = async (
    tagName: string,
    recommendId: string | Types.ObjectId
) => {
    const tag = await Tag.findOneAndUpdate(
        { name: tagName },
        { $addToSet: { usedIn: recommendId } },
        { new: true, upsert: true, useFindAndModify: false }
    );
    return tag._id;
};

export const removeRecommendationFromTag = async (
    tags: Array<string> | Array<Types.ObjectId>,
    recommendId: string | Types.ObjectId
) => {
    return await Tag.updateMany(
        { _id: tags },
        { $pull: { usedIn: recommendId } },
        { new: true, upsert: true, useFindAndModify: false }
    );
};

export const getAllTags = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    Tag.find()
        .then((tags) => res.send({ tags: tags }))
        .catch(next);
};

export const getPopularTags = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    Tag.aggregate([
        {
            $addFields: { count: { $size: { $ifNull: ['$usedIn', []] } } },
        },
        {
            $sort: { count: -1 },
        },
    ])
        .limit(20)
        .then((tags) => res.send({ tags: tags }))
        .catch(next);
};
