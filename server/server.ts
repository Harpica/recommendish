import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';
import { WsServer } from './services/ws';

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
    origin: `http://${BASE_URL}:${CLIENT_PORT}`,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        const wsServer = new WsServer(server);
        wsServer.start();
    })
    .catch((err) => console.log(err));
