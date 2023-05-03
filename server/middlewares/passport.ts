// import passport from 'passport';
import GitHubStrategy from 'passport-github';
import dotenv from 'dotenv';
import { User } from '../models/user';

import passport from 'passport';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';

dotenv.config();

const PORT = process.env.SERVER_PORT || 5004;
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'localhost';

passport.use(
    'github',
    new GitHubStrategy(
        {
            clientID: process.env.SOCIALS_GITHUB_ID ?? '',
            clientSecret: process.env.SOCIALS_GITHUB_SECRET ?? '',
            callbackURL: `http://${BASE_URL}:${PORT}/auth/github/callback/`,
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            // done(null, profile);
            const userData = {
                name: profile.displayName,
                login: profile.username,
                avatar: profile.photos && profile.photos[0].value,
            };
            User.findOneAndUpdate(
                {
                    name: userData?.name,
                    login: userData?.login,
                },
                { ...userData },
                { new: true, upsert: true, useFindAndModify: false }
            )
                .exec()
                .then((user) => {
                    if (!user) {
                        return done(new DocumentNotFoundError(), user);
                    }
                    console.log(user);
                    return done(null, user);
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
});

export default passport;
