import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
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
    avatar: {
        type: String,
    },
    email: {
        type: String,
    },
    current_rating: {
        type: Number,
        default: 0,
    },
    rating: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
            star: Number,
        },
    ],
    recommendations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'recomendation',
        },
    ],
    theme: {
        type: String,
        default: 'white',
        required: true,
    },
    language: {
        type: String,
        default: 'EN',
        required: true,
    },
});

export const User = model('User', UserSchema);
