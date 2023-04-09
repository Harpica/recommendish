import { Comment, IComment } from '../models/comment';

export const createComment = async (commentData: IComment) => {
    return Comment.create(commentData).then((newComment) => {
        return newComment.populate(['owner']);
    });
};
