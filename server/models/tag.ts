import { Schema, model } from 'mongoose';

const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },
});

export const Tag = model('Tag', TagSchema);
