import { Schema, Types, model } from 'mongoose';
import { IRecommendation } from './recommendation';

export interface IUser {
    name: string;
    role: 'admin' | 'user';
    status: 'active' | 'blocked';
    likes: Types.ObjectId[];
    recommendations: Types.ObjectId[] | Array<IRecommendation>;
    theme: string;
    language: string;
    _id: number | undefined;
    avatar?: string | undefined;
    email?: string | undefined;
}

const UserSchema = new Schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        required: true,
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    recommendations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'recomendation',
        },
    ],
    theme: {
        type: String,
        default: 'light',
        required: true,
    },
    language: {
        type: String,
        default: 'EN',
        required: true,
    },
});

export const User = model('User', UserSchema);
