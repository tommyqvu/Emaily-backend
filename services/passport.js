const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const cookieSession = require("cookie-session")
const keys = require('../config/key');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    console.log(e);
  }
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.OAUTH_CLIENT_ID,
      clientSecret: keys.OAUTH_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (!existingUser) {
          const newUser = await new User({ googleId: profile.id }).save();
          return done(null, newUser);
        }
        return done(null, existingUser);
      } catch (e) {
        console.log(e);
      }
    },
  ),
);
