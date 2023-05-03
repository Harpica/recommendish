import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import session from 'express-session';
import passport from './middlewares/passport';
import UnauthorizedError from './utils/errors/UnautorizedError';

dotenv.config();

const app = express();

const PORT = process.env.SERVER_PORT || 5004;
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'localhost';
const MONGODB_PORT = process.env.MONGODB_DATABASE_PORT || 27017;
const MONGODB_DATABASE_USERNAME = process.env.MONGODB_DATABASE_USERNAME || '';
const MONGODB_DATABASE_PASSWORD = process.env.MONGODB_DATABASE_PASSWORD || '';
const MONGODB_DATABASE_NAME =
    process.env.MONGODB_DATABASE_NAME || 'recommendish-db';

const corsOptions = {
    origin: [`http://${BASE_URL}:${PORT}`, `http://${BASE_URL}:${CLIENT_PORT}`],
    credentials: true,
    optionSuccessStatus: 200,
};

console.log(corsOptions);

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.JWT_KEY || 'mysecret',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

mongoose
    .connect(
        `mongodb://${MONGODB_DATABASE_USERNAME}:${MONGODB_DATABASE_PASSWORD}@${BASE_URL}:${MONGODB_PORT}/${MONGODB_DATABASE_NAME}?authSource=admin`
    )
    .then(() => {
        console.log('Connected to DB');
        const server = app.listen(PORT, () => {
            console.log('Listening to', PORT);
        });
    })
    .catch((err) => console.log(err));
