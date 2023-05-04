import passport from 'passport';
import GitHubStrategy from 'passport-github';
import TwitterStrategy from '@superfaceai/passport-twitter-oauth2';
import { User } from '../models/user';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import {
    BASE_URL,
    PORT,
    SOCIALS_GITHUB_ID,
    SOCIALS_GITHUB_SECRET,
    SOCIALS_TWITTER_ID,
    SOCIALS_TWITTER_SECRET,
} from '../utils/constants';

passport.use(
    'github',
    new GitHubStrategy(
        {
            clientID: SOCIALS_GITHUB_ID,
            clientSecret: SOCIALS_GITHUB_SECRET,
            callbackURL: `http://${BASE_URL}:${PORT}/auth/github/callback/`,
        },
        function (_accessToken, _refreshToken, profile, done) {
            handleUserData('githubId', profile, done);
        }
    )
);

passport.use(
    'twitter',
    new TwitterStrategy.Strategy(
        {
            clientType: 'public',
            clientID: SOCIALS_TWITTER_ID,
            clientSecret: SOCIALS_TWITTER_SECRET,
            callbackURL: `http://${BASE_URL}:${PORT}/auth/twitter/callback/`,
        },
        function (_accessToken, _refreshToken, profile, done) {
            handleUserData('twitterId', profile, done);
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
});

function handleUserData(
    profileId: 'githubId' | 'twitterId',
    profile: TwitterStrategy.ProfileWithMetaData | GitHubStrategy.Profile,
    done: any
) {
    const userData = {
        id: profile.id,
        name: profile.displayName,
        login: profile.username!,
        avatar: profile.photos && profile.photos[0].value,
    };
    const findQuery =
        profileId === 'githubId'
            ? {
                  githubId: userData.id,
              }
            : {
                  twitterId: userData.id,
              };

    User.findOneAndUpdate(
        findQuery,
        { ...userData },
        { new: true, upsert: true, useFindAndModify: false }
    )
        .then((user) => {
            if (!user) {
                return done(new DocumentNotFoundError(), user);
            }
            return done(null, user);
        })
        .catch((err) => {
            done(err);
        });
}

export default passport;
