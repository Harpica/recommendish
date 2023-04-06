import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Usage of .env file in the root dir
dotenv.config();

const app = express();

const PORT = process.env.SERVER_PORT || 5004;
const BASE_URL = process.env.BASE_URL || 'localhost';
const MONGODB_PORT = process.env.MONGODB_DATABASE_PORT || 27017;

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(`mongodb://${BASE_URL}:${MONGODB_PORT}`)
    .then(() => {
        console.log('Connected to DB');
        const server = app.listen(PORT, () => {
            console.log('Listening to', PORT);
        });
    })
    .catch((err) => console.log(err));
