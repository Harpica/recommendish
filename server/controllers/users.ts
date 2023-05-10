import { NextFunction, Request, Response } from 'express';
import { IUser, User } from '../models/user';
import { IRecommendation, Recommendation } from '../models/recommendation';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import {
    handleIfDocumentNotFound,
    incorrectDataHandler,
    sendDocumentIfFound,
} from '../utils/utils';
import { ObjectId, Types } from 'mongoose';
import { Comment } from '../models/comment';
import { Product } from '../models/product';
import { Tag } from '../models/tag';

export const localRegisterUser = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const { login, name, password } = req.query;
        console.log(req.query);
        const newUser = new User({
            login: login,
            name: name,
        });

        console.log(newUser, password);
        newUser.password = newUser.generateHash(password as string);
        newUser.save();
        next();
    } catch (err: unknown) {
        if (err instanceof Error) {
            incorrectDataHandler(err, next, 'Incorrect data for user creation');
        }
    }
};

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
    User.find({})
        .populate(['recommendations'])
        .select(['-theme', '-language'])
        .then((users) => {
            res.send({ users: users });
        })
        .catch(next);
};

export const getUserRecommendationsById = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    User.findById(req.params.id)
        .select(['recommendations'])
        .populate([
            {
                path: 'recommendations',
                select: '-owner_name -product_name -tags_names',
                populate: ['tags', 'product'],
            },
        ])
        .then((user) => {
            handleIfDocumentNotFound(user);
            res.send({ recommendations: user!.recommendations });
        })
        .catch(next);
};

export const setUserLikes = async (id: Types.ObjectId, next: NextFunction) => {
    await getPopulatedRecommendations(
        id,
        async (user: IUser) => {
            const recommendations =
                user.recommendations as Array<IRecommendation>;
            const totalCount = recommendations.reduce((prev, curr) => {
                return prev + curr.likes.length;
            }, 0);
            await User.findByIdAndUpdate(id, { likes: totalCount });
        },
        next
    );
};

export const addRecommendationToUser = async (
    userId: Types.ObjectId,
    recommendationId: Types.ObjectId
) => {
    return await User.findByIdAndUpdate(userId, {
        $addToSet: { recommendations: recommendationId },
    });
};

export const removeRecommendationFromUser = async (
    userId: Types.ObjectId,
    recommendationId: Types.ObjectId
) => {
    return await User.findByIdAndUpdate(userId, {
        $pull: { recommendations: recommendationId },
    });
};

const getPopulatedRecommendations = async (
    id: Types.ObjectId,
    resultHandler: Function,
    next: NextFunction
) => {
    return User.findById(id)
        .select('recommendations')
        .populate(['recommendations'])
        .then((user) => {
            if (user) {
                resultHandler(user);
            } else {
                throw new DocumentNotFoundError();
            }
        })
        .catch((err) => {
            incorrectDataHandler(err, next, 'Incorrect _id');
        });
};

export const updateUsersStatus = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const ids = req.body.data.ids;
    updateUserField(
        ids,
        'status',
        req.body.data.status,
        (updateResult: unknown) =>
            sendDocumentIfFound(updateResult, res, 'updateResult'),
        (err: Error) => incorrectDataHandler(err, next, 'Incorrect _id')
    );
};

export const updateUsersRole = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const ids = req.body.data.ids;
    updateUserField(
        ids,
        'role',
        req.body.data.role,
        (updateResult: unknown) =>
            sendDocumentIfFound(updateResult, res, 'updateResult'),
        (err: Error) => incorrectDataHandler(err, next, 'Incorrect _id')
    );
};

export const updateUserTheme = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    updateUserField(
        id,
        'theme',
        req.body.data.theme,
        (user: IUser) => sendDocumentIfFound(user, res, 'user'),
        (err: Error) => incorrectDataHandler(err, next, 'Incorrect _id')
    );
};

export const updateUserLanguage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    updateUserField(
        id,
        'language',
        req.body.data.language,
        (user: IUser) => sendDocumentIfFound(user, res, 'user'),
        (err: Error) => incorrectDataHandler(err, next, 'Incorrect _id')
    );
};

const updateUserField = (
    ids: Array<string> | string,
    field: string,
    value: unknown,
    resolveHandler: Function,
    rejectHandler: Function
) => {
    User.updateMany({ _id: { $in: ids } }, { [field]: value }, { new: true })
        .then((data) => {
            resolveHandler(data);
        })
        .catch((err) => {
            rejectHandler(err);
        });
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const ids = req.body.ids;
    User.deleteMany({ _id: { $in: ids } })
        .then(async (response) => {
            const usersRecommendationIds = await Recommendation.find({
                owner: { $in: ids },
            }).select('_id');
            await Recommendation.deleteMany({
                _id: { $in: ids },
            });
            await Comment.deleteMany({
                owner: { $in: ids },
            });
            await Product.updateMany(
                {
                    rating: {
                        $elemMatch: { user: { $in: ids } },
                    },
                },
                {
                    $pull: {
                        rating: {
                            user: { $in: ids },
                        },
                    },
                }
            );
            await Recommendation.updateMany(
                {
                    likes: { $elemMatch: { $in: ids } },
                },
                {
                    $pull: { likes: { $in: ids } },
                }
            );
            await Tag.updateMany(
                { isUsed: { $in: usersRecommendationIds } },
                {
                    $pull: { isUsed: usersRecommendationIds },
                }
            );
            await Tag.deleteMany({
                isUsed: {
                    $size: 0,
                },
            });
            res.send({ response: response });
        })
        .catch(next);
};
