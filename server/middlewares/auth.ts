import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ForbiddenError from '../utils/errors/ForbiddenError';
import UnauthorizedError from '../utils/errors/UnautorizedError';
import { IUser, User } from '../models/user';
import { handleIfDocumentNotFound } from '../utils/utils';

interface JwtPayload {
    id: string;
}

// export const auth = (sendUser: boolean = false) => {
//     return (req: Request, _res: Response, next: NextFunction) => {
//         const token = req.cookies.jwt;

//         if (!token) {
//             next(new UnauthorizedError());
//         } else {
//             let payload: string | jwt.JwtPayload;
//             payload = jwt.verify(
//                 token,
//                 process.env.JWT_KEY || ''
//             ) as JwtPayload;
//             User.findById(payload.id)
//                 .then((user) => {
//                     handleIfDocumentNotFound(user);
//                     if (user!.status === 'blocked') {
//                         throw new ForbiddenError('User is blocked');
//                     }
//                     if (sendUser) {
//                         req.body.user = user;
//                     }
//                     next();
//                 })
//                 .catch(next);
//         }
//     };
// };
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
