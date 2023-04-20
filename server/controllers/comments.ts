import { FilterQuery, Types } from 'mongoose';
import { Comment } from '../models/comment';
import { addCommentToRecommendation } from './recommendations';
import { NextFunction, Request, Response } from 'express';
import { incorrectDataHandler, sendDocumentIfFound } from '../utils/utils';

export const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Comment.create(req.body.data.comment)
        .then(async (newComment) => {
            await addCommentToRecommendation(
                newComment.recommendation,
                newComment._id
            );
            const comment = await newComment.populate([
                { path: 'owner', select: 'name likes _id avatar' },
            ]);
            res.send({ comment: comment });
        })
        .catch((err) =>
            incorrectDataHandler(
                err,
                next,
                'Incorrect data for comment creation'
            )
        );
};

export const getLatestComments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const date = req.query.date;
    const id = req.query.id;
    try {
        const comments = await findComments({
            recommendation: id,
            createdAt: { $gte: new Date(Number(date)) },
        });
        sendDocumentIfFound(comments, res, 'comments');
    } catch (err: unknown) {
        console.log(err);
        if (err instanceof Error) {
            incorrectDataHandler(err, next, 'Incorrect data');
        }
    }
};

export const getAllComments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.query.id;
    try {
        const comments = await findComments({
            recommendation: id,
        });
        sendDocumentIfFound(comments, res, 'comments');
    } catch (err: unknown) {
        if (err instanceof Error) {
            incorrectDataHandler(err, next, 'Incorrect data');
        }
    }
};

const findComments = <T>(query: FilterQuery<T>) => {
    return Comment.find(query).populate([
        { path: 'owner', select: 'name likes _id avatar' },
    ]);
};
