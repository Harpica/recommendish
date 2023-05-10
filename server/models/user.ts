import { Schema, Types, model } from 'mongoose';
import { IRecommendation } from './recommendation';
import bcrypt from 'bcrypt';

export interface IUser {
    _id: Types.ObjectId;
    githubId?: number;
    twitterId?: number;
    vkId?: number;
    name: string;
    role: 'admin' | 'user';
    status: 'active' | 'blocked';
    likes: number;
    recommendations: Types.ObjectId[] | Array<IRecommendation>;
    theme: string;
    language: string;
    avatar?: string | undefined;
    login?: string | undefined;
    password?: string;
    generateHash: (password: string) => string;
    validPassword: (id: Types.ObjectId, password: string) => boolean;
}

const UserSchema = new Schema<IUser>({
    githubId: {
        type: Number,
    },
    twitterId: {
        type: Number,
    },
    vkId: {
        type: Number,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        select: false,
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
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    avatar: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    recommendations: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Recommendation',
            },
        ],
        default: [],
    },
    theme: {
        type: String,
        default: 'light',
        required: true,
    },
    language: {
        type: String,
        default: 'en',
        required: true,
    },
});

UserSchema.methods.generateHash = function (password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

UserSchema.methods.validPassword = async function (
    id: string,
    password: string
) {
    const user = await User.findById(id).select('+password');
    console.log(user);
    if (user && user.password) {
        return bcrypt.compareSync(password, user.password);
    }
    return false;
};

export const User = model('User', UserSchema);
