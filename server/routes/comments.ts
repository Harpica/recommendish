import { Router } from 'express';
import {
    createComment,
    getAllComments,
    getLatestComments,
} from '../controllers/comments';
import { auth } from '../middlewares/auth';

const comments = Router();

comments.get('/', getAllComments);
comments.get('/latest', getLatestComments);
comments.use(auth);
comments.post('/create', createComment);

export default comments;
