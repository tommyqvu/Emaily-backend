const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/key');
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.OAUTH_CLIENT_ID,
      clientSecret: keys.OAUTH_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile,done) => {
      console.log(accessToken);
    },
  ),
);