const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');


//tellpassport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: '763392453402-e88lgujl76i6s0kobn140c797e1fi7oh.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},
    function (accessToken, refreshToken, profile, done) {
        //find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log('error in goofle strategy-passport', err);
                return;
            }
            console.log(profile);
            if (user) {
                //if found,create the user and set it as req.user
                return done(null, user);
            } else {
                //if not found , create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log('Error in creating user google-strategy-passport', err);
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }))