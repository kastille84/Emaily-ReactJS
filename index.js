const express = require('express');
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
    //app is used to set up configuration that listens for incoming requests
const app = express();
    // enables cookies inside of our application
app.use(
    cookieSession({
        // cookie will last for 30 days before it expires
        maxAge: 30 * 24 *60 * 60 * 1000,
        // key used to encrypt our cookie
        keys: [keys.cookieKey]
    })
)
    //telling passport to use cookies to manage our authentication 
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);


const PORT = process.env.PORT  || 5000;

app.listen(PORT, () => {
    console.log('listening')
});