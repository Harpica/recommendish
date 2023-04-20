import { Error } from 'mongoose';
import { Product } from '../models/product';
import { NextFunction, Request, Response } from 'express';
import { handleIfDocumentNotFound } from '../utils/utils';

export const updateOrCreateProduct = async (
    productName: string,
    group: string
) => {
    try {
        const product = await Product.findOneAndUpdate(
            { name: productName },
            { group: group, name: productName },
            { new: true, upsert: true, useFindAndModify: false }
        );
        console.log(product);
        return product._id;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        console.log(err);
    }
};

export const updateRating = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const { user } = req.body.data;
        const product = await Product.findById(id);
        handleIfDocumentNotFound(product);
        const updatedRatings = [
            ...product!.rating.filter((rate) => rate.user === user),
            req.body.data,
        ];
        const currentRating =
            updatedRatings.reduce((prev, curr) => {
                return prev + curr.rating;
            }, 0) / updatedRatings.length;
        await Product.findByIdAndUpdate(id, {
            rating: updatedRatings,
            current_rating: currentRating,
        });
        product!.rating = updatedRatings;
        product!.current_rating = currentRating;
        res.send({
            product: product,
        });
    } catch (err) {
        next(err);
    }
};
