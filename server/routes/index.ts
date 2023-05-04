import { Router } from 'express';
import recommendations from './recommendations';
import users from './users';
import tags from './tags';
import products from './products';
import comments from './comments';
import images from './images';
import auth from './auth';
import errorHandler from '../middlewares/errorHandler';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';

const routes = Router();

routes.use('/auth', auth);
routes.use('/recommendations', recommendations);
routes.use('/users', users);
routes.use('/tags', tags);
routes.use('/products', products);
routes.use('/comments', comments);
routes.use('/images', images);

routes.use(() => {
    throw new DocumentNotFoundError('Page not found');
});

routes.use(errorHandler);

export default routes;
