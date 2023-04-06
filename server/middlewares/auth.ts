import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ForbiddenError from '../utils/errors/ForbiddenError';
import UnauthorizedError from '../utils/errors/UnautorizedError';
import { User } from '../models/user';

interface JwtPayload {
    id: string;
}

export const auth = (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        next(new UnauthorizedError());
    } else {
        let payload: string | jwt.JwtPayload;
        payload = jwt.verify(token, process.env.JWT_KEY || '') as JwtPayload;
        User.findById(payload.id)
            .then((user) => {
                if (user?.status === 'blocked') {
                    throw new ForbiddenError('User is blocked');
                }
                next();
            })
            .catch(next);
    }
};
