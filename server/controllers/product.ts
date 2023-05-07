import { Error, Types } from 'mongoose';
import { IProduct, Product } from '../models/product';
import { NextFunction, Request, Response } from 'express';
import { handleIfDocumentNotFound } from '../utils/utils';

export const createProduct = async (productName: string, group: string) => {
    try {
        const product = await Product.create({
            group: group,
            name: productName,
        });
        return product._id;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        console.log(err);
    }
};
export const updateProduct = async (productName: string, group: string) => {
    try {
        const product = await Product.findOneAndUpdate(
            { name: productName },
            { group: group, name: productName },
            { upsert: true, useFindAndModify: false }
        );
        handleIfDocumentNotFound(product);
        return product!._id;
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
        const product = await Product.findById(id);
        handleIfDocumentNotFound(product);
        const updatedProduct = await getUpdatedProduct(
            req.body.data,
            product!,
            id
        );
        res.send({
            product: updatedProduct,
        });
    } catch (err) {
        next(err);
    }
};

const getUpdatedProduct = async (
    rating: { user: string; rating: number },
    product: IProduct,
    id: string
) => {
    const updatedRatings = [
        ...product!.rating.filter(
            (rate: { user: Types.ObjectId; rating: number }) => {
                return rate.user?._id.toString() !== rating.user;
            }
        ),
        rating,
    ];
    const currentRating =
        updatedRatings.reduce((prev, curr) => {
            return prev + curr.rating;
        }, 0) / updatedRatings.length;
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
            rating: updatedRatings,
            current_rating: currentRating,
        },
        { new: true }
    );
    return updatedProduct;
};

export const getAllProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await Product.find();
        res.send({ products: products });
    } catch (err) {
        next(err);
    }
};
