import passport from 'passport';
import GitHubStrategy from 'passport-github';
import TwitterStrategy from 'passport-twitter';
import VkontakteStrategy from 'passport-vkontakte';
import LocalStrategy from 'passport-local';
import { User } from '../models/user';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import {
    SERVER_URL,
    SOCIALS_GITHUB_ID,
    SOCIALS_GITHUB_SECRET,
    SOCIALS_TWITTER_APP_KEY,
    SOCIALS_TWITTER_APP_KEY_SECRET,
    SOCIALS_VK_ID,
    SOCIALS_VK_SECRET,
} from '../utils/constants';
import UnauthorizedError from '../utils/errors/UnautorizedError';

passport.use(
    'local',
    new LocalStrategy.Strategy(
        {
            usernameField: 'login',
            passwordField: 'password',
        },
        function (login, password, done) {
            User.findOne({ login: login })
                .then(async (user) => {
                    const passwordIsValid = await user?.validPassword(
                        user._id,
                        password
                    );
                    if (!user || !passwordIsValid) {
                        return done(
                            new UnauthorizedError(
                                'Login or passport is incorrect'
                            ),
                            false
                        );
                    }
                    return done(null, user);
                })
                .catch((err) => {
                    done(err);
                });
        }
    )
);

passport.use(
    'github',
    new GitHubStrategy(
        {
            clientID: SOCIALS_GITHUB_ID,
            clientSecret: SOCIALS_GITHUB_SECRET,
            callbackURL: `${SERVER_URL}/auth/github/callback/`,
        },
        (_accessToken, _refreshToken, profile, done) => {
            handleUserData('githubId', profile, done);
        }
    )
);

passport.use(
    'vkontakte',
    new VkontakteStrategy.Strategy(
        {
            clientID: SOCIALS_VK_ID,
            clientSecret: SOCIALS_VK_SECRET,
            callbackURL: `${SERVER_URL}/auth/vkontakte/callback/`,
        },
        (
            _accessToken: string,
            _refreshToken: string,
            profile: any,
            done: any
        ) => {
            handleUserData('vkId', profile, done);
        }
    )
);

{
    /* Twitter login works only in develop mode because VDS with deployed production is located in russia where twitter is banned :/ */
}

passport.use(
    'twitter',
    new TwitterStrategy.Strategy(
        {
            consumerKey: SOCIALS_TWITTER_APP_KEY,
            consumerSecret: SOCIALS_TWITTER_APP_KEY_SECRET,
            callbackURL: `${SERVER_URL}/auth/twitter/callback/`,
        },
        (_accessToken, _refreshToken, profile, done) => {
            handleUserData('twitterId', profile, done);
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(function (id: string, done: any) {
    User.findById(id)
        .then((user) => {
            if (!user) {
                done(new DocumentNotFoundError(), null);
            } else {
                done(null, user);
            }
        })
        .catch((err) => done(err, null));
});

function handleUserData(
    profileId: 'githubId' | 'twitterId' | 'vkId',
    profile: GitHubStrategy.Profile | TwitterStrategy.Profile,
    done: any
) {
    const userData = {
        id: profile.id,
        name: profile.displayName,
        login: profile.username!,
        avatar: profile.photos && profile.photos[0].value,
    };
    const findQuery = {
        githubId: {
            githubId: userData.id,
        },
        vkId: {
            vkId: userData.id,
        },
        twitterId: {
            twitterId: userData.id,
        },
    };

    User.findOneAndUpdate(
        findQuery[profileId],
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
