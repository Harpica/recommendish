// import { Response } from 'express';

import { NextFunction, Response } from 'express';
import DocumentNotFoundError from './errors/DocumentNotFoundError';
import mongoose from 'mongoose';
import BadRequestError from './errors/BadRequestError';

// export const withResponse = <T>(res: Response) => {
//     return (result: T) => {
//         return [result, res];
//     };
// };

export const sendDocumentIfFound = (
    document: unknown | null,
    res: Response,
    documentName: string = 'data'
) => {
    handleIfDocumentNotFound(document);
    if (document !== null) {
        res.send({ [documentName]: document });
    }
};

export const handleIfDocumentNotFound = (document: unknown | null) => {
    if (!document) {
        throw new DocumentNotFoundError(
            'Document with current _id is not found'
        );
    }
};

export const incorrectDataHandler = (
    err: Error,
    next: NextFunction,
    message?: string
) => {
    if (
        err instanceof mongoose.Error.ValidationError ||
        err instanceof mongoose.Error.CastError
    ) {
        next(new BadRequestError(message));
        return;
    }
    console.log(err);
    next(err);
};

// export function onlyUniqueObjects(
//     object: unknown,
//     index: number,
//     array: Array<unknown>,
//     value: unknown
// ) {
//     return array.indexOf(object.value) === index;
// }
