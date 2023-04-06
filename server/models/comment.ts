import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    body: {
        type: String,
        minlength: 5,
        required: true,
    },
});

export const Comment = model('Comment', CommentSchema);
