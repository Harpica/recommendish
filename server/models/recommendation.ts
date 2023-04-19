import { Schema, Types, model } from 'mongoose';

export interface IRecommendation {
    id?: number;
    createdAt?: number;
    updatedAt?: number;
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

const RecommendSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        owner_name: {
            type: String,
        },
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 40,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        product_name: {
            type: String,
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
                    ref: 'Tag',
                },
            ],
            default: [],
        },
        tags_names: {
            type: [
                {
                    type: String,
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
                    ref: 'User',
                },
            ],
            default: [],
        },
        comments: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

export const Recommendation = model('Recommendation', RecommendSchema);

RecommendSchema.index({
    owner_name: 'text',
    name: 'text',
    product_name: 'text',
    tags_names: 'text',
    group: 'text',
    body: 'text',
});

Recommendation.syncIndexes();
