import dotenv from 'dotenv';
import { SessionOptions } from 'express-session';

dotenv.config();

// Envs
export const SERVER_PORT_INTERNAL = 5004;
export const PORT_EXTERNAL = process.env.PORT_EXTERNAL || 3000;
export const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1';
export const MONGODB_PORT = process.env.MONGODB_DATABASE_PORT || 27017;
export const MONGODB_DATABASE_USERNAME =
    process.env.MONGODB_DATABASE_USERNAME || '';
export const MONGODB_DATABASE_PASSWORD =
    process.env.MONGODB_DATABASE_PASSWORD || '';
export const MONGODB_DATABASE_NAME =
    process.env.MONGODB_DATABASE_NAME || 'recommendish-db';
export const JWT_KEY = process.env.JWT_KEY || 'mysecret';
export const SOCIALS_GITHUB_ID = process.env.SOCIALS_GITHUB_ID || '';
export const SOCIALS_GITHUB_SECRET = process.env.SOCIALS_GITHUB_SECRET || '';
export const SOCIALS_TWITTER_ID = process.env.SOCIALS_TWITTER_ID || '';
export const SOCIALS_TWITTER_SECRET = process.env.SOCIALS_GITHUB_SECRET || '';
export const SOCIALS_TWITTER_APP_KEY =
    process.env.SOCIALS_TWITTER_APP_KEY || '';
export const SOCIALS_TWITTER_APP_KEY_SECRET =
    process.env.SOCIALS_TWITTER_APP_KEY_SECRET || '';

// Configs
export const corsOptions = {
    origin: [`${BASE_URL}:${PORT_EXTERNAL}`],
    credentials: true,
    optionSuccessStatus: 200,
};
export const sessionOptions: SessionOptions = {
    secret: JWT_KEY,
    resave: false,
    saveUninitialized: false,
};
