import { Error } from 'mongoose';
import { Product } from '../models/product';

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
