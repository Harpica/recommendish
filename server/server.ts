import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import session from 'express-session';
import passport from './middlewares/passport';
import {
    BASE_URL,
    MONGODB_DATABASE_NAME,
    MONGODB_DATABASE_PASSWORD,
    MONGODB_DATABASE_USERNAME,
    MONGODB_PORT,
    SERVER_PORT_INTERNAL,
    corsOptions,
    sessionOptions,
} from './utils/constants';

const app = express();

app.set('trust proxy', true);
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

mongoose
    .connect(
        `mongodb://${MONGODB_DATABASE_USERNAME}:${MONGODB_DATABASE_PASSWORD}@127.0.0.1:${MONGODB_PORT}/${MONGODB_DATABASE_NAME}?authSource=admin`
    )
    .then(() => {
        console.log('Connected to DB');
        app.listen(SERVER_PORT_INTERNAL, () => {
            console.log('Listening to', SERVER_PORT_INTERNAL);
        });
    })
    .catch((err) => console.log(err));
