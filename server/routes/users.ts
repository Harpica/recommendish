import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authUser, getUsers, updateUserStatus } from '../controllers/users';
import { auth } from '../middlewares/auth';
import { validator } from '../utils/celebrate/validations';

const users = Router();

users.post('/auth', celebrate(validator.user.object), authUser);
users.get('/:id');
// users.use(auth);
users.get('/', getUsers);
users.patch('/:id/status', updateUserStatus);

export default users;
