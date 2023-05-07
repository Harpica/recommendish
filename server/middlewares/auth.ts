import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../utils/errors/ForbiddenError';
import UnauthorizedError from '../utils/errors/UnautorizedError';
import { IUser, User } from '../models/user';
import { handleIfDocumentNotFound } from '../utils/utils';

export const auth = (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
        next(new UnauthorizedError());
    } else {
        User.findById((user as IUser)._id)
            .then((user) => {
                handleIfDocumentNotFound(user);
                if (user!.status === 'blocked') {
                    throw new ForbiddenError('User is blocked');
                }
                next();
            })
            .catch(next);
    }
};
