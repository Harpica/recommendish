import { Schema, Types, model } from 'mongoose';

export interface IProduct {
    _id: Types.ObjectId;
    name: string;
    group: 'movie' | 'book' | 'game';
    current_rating: number;
    rating: Array<{ user: Types.ObjectId; rating: number }>;
}

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },
    group: {
        type: String,
        enum: ['movie', 'book', 'game'],
        required: true,
    },
    current_rating: {
        type: Number,
        default: 0,
    },
    rating: {
        type: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                rating: {
                    type: Number,
                    max: 5,
                    min: 1,
                    required: true,
                },
            },
        ],
        default: [],
    },
});

export const Product = model('Product', ProductSchema);
