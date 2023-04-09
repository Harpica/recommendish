import { Router } from 'express';
import { authUser, getUsers, updateUserStatus } from '../controllers/users';
import { auth } from '../middlewares/auth';

const users = Router();

users.post('/auth', authUser);
users.get('/:id');
users.use(auth);
users.get('/', getUsers);
users.patch('/:id/status', updateUserStatus);

export default users;
