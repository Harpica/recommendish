import { Schema, model } from 'mongoose';

const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },
    usedIn: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'recommendation',
            },
        ],
        default: [],
    },
});

export const Tag = model('Tag', TagSchema);
