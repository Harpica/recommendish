import { NextFunction, Request, Response } from 'express';
import { Tag } from '../models/tag';
import { Types } from 'mongoose';

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

export const getAllTags = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    Tag.find()
        .then((tags) => res.send({ data: tags }))
        .catch(next);
};

export const getPopularTags = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    Tag.find()
        .sort({ 'usedIn.length': -1 })
        .limit(20)
        .then((tags) => res.send({ data: tags }))
        .catch(next);
};
