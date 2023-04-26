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

export const uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const imageData = req.body.data.image;
        const result = await cloud.uploader.upload(imageData, {
            upload_preset: 'recommendish',
        });
        res.send({
            image: { url: result.url, publicId: result.public_id },
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const deleteImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = 'recommendish/' + req.params.publicId;

        await cloud.uploader.destroy(id);
        res.send({
            publicId: id,
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
