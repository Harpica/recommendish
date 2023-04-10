import { Schema, model } from 'mongoose';

export interface IComment {
    owner: Schema.Types.ObjectId;
    body: string;
}

const CommentSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    body: {
        type: String,
        minlength: 5,
        required: true,
    },
});

export const Comment = model('Comment', CommentSchema);
