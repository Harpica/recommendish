import { Types } from 'mongoose';
import { Comment, IComment } from '../models/comment';
import { addCommentToRecommendation } from './recommendations';

export const createComment = async (commentData: {
    recommendationId: Types.ObjectId;
    owner: Types.ObjectId;
    body: string;
}) => {
    return Comment.create(commentData).then(async (newComment) => {
        await addCommentToRecommendation(
            commentData.recommendationId,
            newComment._id
        );
        return newComment.populate([
            { path: 'owner', select: 'name likes _id avatar' },
        ]);
    });
};
