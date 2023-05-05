import { Router } from 'express';
import passport from '../middlewares/passport';
import { BASE_URL, CLIENT_PORT } from '../utils/constants';
import UnauthorizedError from '../utils/errors/UnautorizedError';

const auth = Router();

const redirect = `http://${BASE_URL}:${CLIENT_PORT}`;

auth.get('/github', passport.authenticate('github'));

auth.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: redirect,
        successRedirect: redirect,
    })
);

auth.get(
    '/twitter',
    passport.authenticate('twitter', {
        scope: ['tweet.read', 'tweet.write', 'users.read'],
    })
);

auth.get(
    '/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: redirect,
        successRedirect: redirect,
    })
);

auth.get('/', (req, res, next) => {
    if (req.user) {
        res.send({ user: req.user });
        return;
    } else {
        next(new UnauthorizedError());
    }
});

auth.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        res.send('Logout');
    });
});

export default auth;
