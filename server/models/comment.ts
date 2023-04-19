import { Schema, model } from 'mongoose';

// export interface IComment {
//     _id: string;
//     owner: Schema.Types.ObjectId;
//     recommendation: Schema.Types.ObjectId;
//     body: string;
//     createdAt: number;
//     updatedAt: number;
// }

const CommentSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        recommendation: {
            type: Schema.Types.ObjectId,
            ref: 'Recommendation',
        },
        body: {
            type: String,
            minlength: 5,
            required: true,
        },
    },
    { timestamps: true }
);

CommentSchema.index({
    body: 'text',
});

export const Comment = model('Comment', CommentSchema);
