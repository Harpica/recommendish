import { Router } from 'express';
import recommendations from './recommendations';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import users from './users';
import errorHandler from '../middlewares/errorHandler';
import tags from './tags';
import products from './products';
import comments from './comments';
import images from './images';
import UnauthorizedError from '../utils/errors/UnautorizedError';
import passport from '../middlewares/passport';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'localhost';

const routes = Router();

routes.get('/auth/github', passport.authenticate('github'));
routes.get(
    '/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: `http://${BASE_URL}:${CLIENT_PORT}`,
        successRedirect: `http://${BASE_URL}:${CLIENT_PORT}`,
    })
);
routes.get('/auth', function (req, res, next) {
    if (req.user) {
        res.send({ user: req.user });
        return;
    } else {
        next(new UnauthorizedError());
    }
});
routes.get('/auth/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        res.redirect(`http://${BASE_URL}:${CLIENT_PORT}`);
    });
});
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
