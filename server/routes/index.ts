import { Router } from 'express';
import recommendations from './recommendations';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import users from './users';
import errorHandler from '../middlewares/errorHandler';
import tags from './tags';

const routes = Router();

routes.use('/recommendations', recommendations);
routes.use('/users', users);
routes.use('/tags', tags);

routes.use(() => {
    throw new DocumentNotFoundError('Page not found');
});

routes.use(errorHandler);

export default routes;
