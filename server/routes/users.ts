import { Router } from 'express';

import {
    getUserRecommendationsById,
    getUsers,
    updateUserLanguage,
    updateUserStatus,
    updateUserTheme,
} from '../controllers/users';
import { auth } from '../middlewares/auth';

const users = Router();

users.use(auth);
users.get('/', getUsers);
users.get('/:id/recommendations', getUserRecommendationsById);
users.patch('/:id/status', updateUserStatus);
users.patch('/:id/theme', updateUserTheme);
users.patch('/:id/language', updateUserLanguage);

export default users;
