import { Schema, Types, model } from 'mongoose';

export interface IRecommendation {
    id?: number;
    createdAt?: number;
    owner: Types.ObjectId;
    name: string;
    product: Types.ObjectId;
    productRating: number;
    group: 'movie' | 'book' | 'game';
    tags: Array<Types.ObjectId>;
    body: string;
    images: Array<string>;
    likes: Array<Types.ObjectId>;
    comments: Array<Types.ObjectId>;
}

const RecommendSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    productRating: {
        type: Number,
        default: 0,
        required: true,
    },
    group: {
        type: String,
        enum: ['movie', 'book', 'game'],
        required: true,
    },
    tags: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'tag',
            },
        ],
        default: [],
    },
    body: {
        type: String,
        required: true,
        minlength: 10,
    },
    images: {
        type: [
            {
                type: String,
            },
        ],
        default: [],
    },
    likes: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        default: [],
    },
    comments: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        default: [],
    },
});

RecommendSchema.index({
    'owner.name': 'text',
    name: 'text',
    'product.name': 'text',
    'tag.name': 'text',
    group: 'text',
    body: 'text',
    'comments.body': 'text',
});

export const Recommendation = model('Recommendation', RecommendSchema);
