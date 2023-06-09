import { Request, Response, Router } from 'express';
import passport from '../middlewares/passport';
import { BASE_URL } from '../utils/constants';
import UnauthorizedError from '../utils/errors/UnautorizedError';
import { localRegisterUser } from '../controllers/users';

const auth = Router();

const redirect = `${BASE_URL}`;

auth.post(
    '/register',
    localRegisterUser,
    passport.authenticate('local'),
    (req: Request, res: Response) => {
        res.send({
            user: req.user,
        });
    }
);

auth.post(
    '/local',
    passport.authenticate('local', {}),
    (req: Request, res: Response) => {
        res.send({
            user: req.user,
        });
    }
);

auth.get('/github', passport.authenticate('github'));

auth.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: redirect,
        successRedirect: redirect,
    })
);

auth.get('/vkontakte', passport.authenticate('vkontakte'));

auth.get(
    '/vkontakte/callback',
    passport.authenticate('vkontakte', {
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
            next(err);
            return;
        }
        res.send('Logout');
    });
});

export default auth;
