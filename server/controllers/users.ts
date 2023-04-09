import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/user';
import { IRecommendation } from '../models/recommendation';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import { incorrectDataHandler, sendDocumentIfFound } from '../utils/utils';

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
    User.find({})
        .populate(['recommendations'])
        .select(['-theme', '-language'])
        .then((users) => {
            res.send({ data: users });
        })
        .catch(next);
};

export const authUser = (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body.data;
    User.findOne({
        name: userData.name,
        email: userData.email,
    })
        .then((user) => {
            if (!user) {
                createUser(userData, res, next);
            }
            sendUserAndToken(user, res);
        })
        .catch(next);
};

const sendUserAndToken = (user: any, res: Response) => {
    const populatedUser = user.populate(['recommendations']);
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY || '');
    res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
    }).send({
        user: populatedUser,
    });
};

const createUser = async (
    userData: typeof User,
    res: Response,
    next: NextFunction
) => {
    return User.create(userData)
        .then((user) => {
            sendUserAndToken(user, res);
        })
        .catch((err) => {
            incorrectDataHandler(err, next, 'Incorrect data for user creation');
        });
};

export const setUserLikes = (id: string, next: NextFunction) => {
    getPopulatedRecommendations(
        id,
        (user: IUser) => {
            const recommendations =
                user.recommendations as Array<IRecommendation>;
            const totalCount = recommendations.reduce((prev, curr) => {
                return prev + curr.likes.length;
            }, 0);
            User.findByIdAndUpdate(id, { likes: totalCount });
        },
        next
    );
};

const getPopulatedRecommendations = async (
    id: string,
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
    User.findByIdAndUpdate(id, { status: req.body.data.status })
        .then((user) => {
            sendDocumentIfFound(user, res);
        })
        .catch((err) => {
            incorrectDataHandler(err, next, 'Incorrect _id');
        });
};