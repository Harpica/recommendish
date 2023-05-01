import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/errors/HttpError';
import { isCelebrateError, CelebrateError } from 'celebrate';

const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof HttpError) {
        res.status(err.statusCode).send({ message: err.message });
        next();
    } else if (isCelebrateError(err)) {
        console.log('celebrate', err);
        console.log('celebrate', err.details);
        res.status(400).send({ message: err.message });
        next();
    } else {
        console.log({ message: err.message });

        res.status(500).send({ message: 'Server error' });
        next();
    }
};

export default errorHandler;
