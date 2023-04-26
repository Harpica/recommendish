import { NextFunction, Request, Response } from 'express';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloud = cloudinary.v2;
cloud.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

export const uploadImages = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const image = req.body.data.image;
        const result = await cloud.uploader.upload(image, {
            upload_preset: 'recommendish',
        });
        res.send({
            imageUrl: result.url,
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
