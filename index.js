const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require("cookie-session")
const passport  = require("passport")

const keys = require('./config/key');
const app = express();
const authRoutes = require('./routes/authRoutes');

require('./models/User');

require('./services/passport');

mongoose.connect(keys.MONGODB_ATLAS, {useNewUrlParser: true});

app.use(cookieSession({maxAge: 30 * 24 * 60 *60 *1000, keys:[keys.cookieKey]}))

app.use(passport.initialize())

app.use(passport.session())

authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
