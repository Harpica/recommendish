import { Schema, model } from 'mongoose';

export interface IComment {
    _id: string;
    owner: Schema.Types.ObjectId;
    recommendation: Schema.Types.ObjectId;
    body: string;
    createdAt: number;
    updatedAt: number;
}

const CommentSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        recommendation: {
            type: Schema.Types.ObjectId,
            ref: 'Recommendation',
            required: true,
        },
        body: {
            type: String,
            minlength: 5,
            required: true,
        },
    },
    { timestamps: true }
);
export const Comment = model('Comment', CommentSchema);

CommentSchema.index({
    body: 'text',
});

Comment.syncIndexes();
