const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//user param is automatically place there from when we queried the DB below to 
//find or create new user
passport.serializeUser((user, done) => {
    done(null, user.id)
});
//id is the cookie
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
})

// we must sign up our app with google. go to console.developers.google.com
//client id & client secret are provided to use by google's oauth service
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            //route the user will be sent to after they granted us permissions
            callbackURL: '/auth/google/callback',
            proxy: true
        }, 
        async (accessToken, refreshToken, profile, done) => {
            //by the time this executes, we already have user info and 
            // it's our opportunity to do somethingwith that user like store his info on db
            const existingUser = await User.findOne({googleId: profile.id});
                
                if (existingUser){
                    // we already have a record with the given profile ID
                    //done(err, userRecord)
                    return done(null, existingUser);
                } 
                    // we dont have a user record with this ID, create a new record
                    const user = await new User({googleId: profile.id }).save()                    
                    done(null, user);                   
                
        }
    )
);
