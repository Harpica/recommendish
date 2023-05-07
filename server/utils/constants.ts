import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

import { SessionOptions } from 'express-session';

dotenv.config();

// Dev Mode
export const DEV_MODE = process.env.DEV_MODE || 'false';

// Envs
export const SERVER_PORT_INTERNAL = 5004;
export const SERVER_URL = process.env.SERVER_URL || 'http://127.0.0.1:5004';
export const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:3000';
export const MONGODB_DATABASE_HOST =
    process.env.MONGODB_DATABASE_HOST || 'recommendish-mongodb'; // 'recommendish-mongodb' is used while running node from docker container
export const MONGODB_DATABASE_PORT = process.env.MONGODB_DATABASE_PORT || 27017;
export const MONGODB_DATABASE_USERNAME =
    process.env.MONGODB_DATABASE_USERNAME || '';
export const MONGODB_DATABASE_PASSWORD =
    process.env.MONGODB_DATABASE_PASSWORD || '';
export const MONGODB_DATABASE_NAME =
    process.env.MONGODB_DATABASE_NAME || 'recommendish-db';
export const JWT_KEY = process.env.JWT_KEY || 'mysecret';
export const SOCIALS_GITHUB_ID = process.env.SOCIALS_GITHUB_ID || '';
export const SOCIALS_GITHUB_SECRET = process.env.SOCIALS_GITHUB_SECRET || '';
export const SOCIALS_VK_ID = process.env.SOCIALS_VK_ID || '';
export const SOCIALS_VK_SECRET = process.env.SOCIALS_VK_SECRET || '';
export const SOCIALS_TWITTER_ID = process.env.SOCIALS_TWITTER_ID || '';
export const SOCIALS_TWITTER_SECRET = process.env.SOCIALS_GITHUB_SECRET || '';
export const SOCIALS_TWITTER_APP_KEY =
    process.env.SOCIALS_TWITTER_APP_KEY || '';
export const SOCIALS_TWITTER_APP_KEY_SECRET =
    process.env.SOCIALS_TWITTER_APP_KEY_SECRET || '';

// Configs
export const corsOptions = {
    origin: `${BASE_URL}`,
    credentials: true,
    optionSuccessStatus: 200,
};
export const sessionOptions: SessionOptions = {
    secret: JWT_KEY,
    resave: false,
    saveUninitialized: false,
};
export const cloudConfig: cloudinary.ConfigOptions = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
};
