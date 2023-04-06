import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import mongoose from 'mongoose';
import BadRequestError from '../utils/errors/BadRequestError';

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
    User.find({})
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
                User.create(userData)
                    .then((user) => {
                        sendUserAndToken(user, res);
                    })
                    .catch((err) => {
                        if (err instanceof mongoose.Error.ValidationError) {
                            next(
                                new BadRequestError(
                                    'Uncorrect data for user creation'
                                )
                            );
                            return;
                        }
                        next(err);
                    });
            }
            sendUserAndToken(user, res);
        })
        .catch(next);
};

const sendUserAndToken = (user: any, res: Response) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY || '');
    res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
    }).send({
        user: user,
    });
};
