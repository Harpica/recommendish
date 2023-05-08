import { Router } from 'express';

import {
    deleteUser,
    getUserRecommendationsById,
    getUsers,
    updateUserLanguage,
    updateUsersRole,
    updateUsersStatus,
    updateUserTheme,
} from '../controllers/users';
import { auth, authAdmin } from '../middlewares/auth';

const users = Router();

users.use(auth);
users.get('/', getUsers);
users.get('/:id/recommendations', getUserRecommendationsById);
users.patch('/:id/theme', updateUserTheme);
users.patch('/:id/language', updateUserLanguage);
users.use(authAdmin);
users.patch('/status', updateUsersStatus);
users.patch('/role', updateUsersRole);
users.delete('/delete', deleteUser);

export default users;
