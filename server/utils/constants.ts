import dotenv from 'dotenv';

dotenv.config();

// Envs
export const PORT = process.env.SERVER_PORT || 5000;
export const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
export const BASE_URL = process.env.BASE_URL || 'localhost';
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

// Configs
export const corsOptions = {
    origin: [`http://${BASE_URL}:${CLIENT_PORT}`],
    credentials: true,
    optionSuccessStatus: 200,
};
export const sessionOptions = {
    secret: JWT_KEY,
    resave: false,
    saveUninitialized: false,
};
