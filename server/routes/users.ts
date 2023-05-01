import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
    authUser,
    getUserRecommendationsById,
    getUsers,
    reauthUser,
    updateUserLanguage,
    updateUserStatus,
    updateUserTheme,
} from '../controllers/users';
import { auth } from '../middlewares/auth';
import { validator } from '../utils/celebrate/validations';

const users = Router();

users.post('/auth', celebrate(validator.user.object), authUser);
users.get('/reauth', auth(true), reauthUser);
users.use(auth());
users.get('/', getUsers);
users.get('/:id/recommendations', getUserRecommendationsById);
users.patch('/:id/status', updateUserStatus);
users.patch('/:id/theme', updateUserTheme);
users.patch('/:id/language', updateUserLanguage);

export default users;
