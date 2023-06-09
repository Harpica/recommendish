import express from 'express';
import https from 'node:https';
import mongoose from 'mongoose';
import fs from 'node:fs';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import session from 'express-session';
import passport from './middlewares/passport';
import {
    MONGODB_DATABASE_HOST,
    MONGODB_DATABASE_NAME,
    MONGODB_DATABASE_PASSWORD,
    MONGODB_DATABASE_USERNAME,
    MONGODB_DATABASE_PORT,
    SERVER_PORT_INTERNAL,
    corsOptions,
    sessionOptions,
    DEV_MODE,
} from './utils/constants';

const app = express();

// app.set('trust proxy', true);

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
        `mongodb://${MONGODB_DATABASE_USERNAME}:${MONGODB_DATABASE_PASSWORD}@${MONGODB_DATABASE_HOST}:${MONGODB_DATABASE_PORT}/${MONGODB_DATABASE_NAME}?authSource=admin`
    )
    .then(() => {
        console.log('Connected to DB');
        if (DEV_MODE === 'true') {
            app.listen(SERVER_PORT_INTERNAL, () => {
                console.log('Listening to', SERVER_PORT_INTERNAL);
            });
        } else {
            https
                .createServer(
                    {
                        key: fs.readFileSync(
                            '/etc/ssl/ssl_certs_porkbun/private.key.pem'
                        ),
                        cert: fs.readFileSync(
                            '/etc/ssl/ssl_certs_porkbun/ssl-bundle.crt'
                        ),
                    },
                    app
                )
                .listen(SERVER_PORT_INTERNAL, () => {
                    console.log('Listening to', SERVER_PORT_INTERNAL);
                });
        }
    })
    .catch((err) => console.log(err));
