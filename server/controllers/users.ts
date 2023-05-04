import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/user';
import { IRecommendation } from '../models/recommendation';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import {
    handleIfDocumentNotFound,
    incorrectDataHandler,
    sendDocumentIfFound,
} from '../utils/utils';
import { ObjectId, Types } from 'mongoose';

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

// export const authUser = (req: Request, res: Response, next: NextFunction) => {
//     // const userData = req.body.data;
//     const userData = req.user as { name: string; login: string };
//     User.findOne({
//         name: userData?.name,
//         login: userData?.login,
//     })
//         .then((user) => {
//             if (!user) {
//                 createUser(userData, res, next);
//                 return;
//             }
//             sendUserAndToken(user, res);
//         })
//         .catch(next);
// };

// export const reauthUser = (req: Request, res: Response, next: NextFunction) => {
//     const user = req.body.user;
//     sendUserAndToken(user, res);
// };

// const sendUserAndToken = async (user: any, res: Response) => {
//     const populatedUser = await user.populate(['recommendations']);
//     const token = jwt.sign({ id: user.id }, process.env.JWT_KEY || '');
//     res.cookie('jwt', token, {
//         maxAge: 3600000,
//         httpOnly: true,
//     }).send({
//         user: populatedUser,
//     });
// };

// const createUser = async (
//     userData: { name: string; login: string; avatar?: string },
//     res: Response,
//     next: NextFunction
// ) => {
//     return User.create(userData)
//         .then((user) => {
//             sendUserAndToken(user, res);
//         })
//         .catch((err) => {
//             incorrectDataHandler(err, next, 'Incorrect data for user creation');
//         });
// };

export const setUserLikes = async (id: Types.ObjectId, next: NextFunction) => {
    await getPopulatedRecommendations(
        id,
        async (user: IUser) => {
            const recommendations =
                user.recommendations as Array<IRecommendation>;
            const totalCount = recommendations.reduce((prev, curr) => {
                return prev + curr.likes.length;
            }, 0);
            console.log(totalCount);
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

export const updateUserStatus = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    updateUserField(
        id,
        'status',
        req.body.data.status,
        (user: IUser) => sendDocumentIfFound(user, res, 'user'),
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
    id: string,
    field: string,
    value: unknown,
    resolveHandler: Function,
    rejectHandler: Function
) => {
    User.findByIdAndUpdate(id, { [field]: value }, { new: true })
        .then((user) => {
            resolveHandler(user);
        })
        .catch((err) => {
            rejectHandler(err);
        });
};
