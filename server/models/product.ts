import { Schema, model } from 'mongoose';

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
                },
                rating: {
                    type: Number,
                    max: 5,
                    min: 1,
                },
            },
        ],
        default: [],
    },
});

export const Product = model('Product', ProductSchema);
