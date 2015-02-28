(function(){'use strict';

    var TwitterStrategy  = require('passport-twitter').Strategy;

    module.exports = function(passport, config) {

        passport.serializeUser(function(user, done) {
            done(null, user);
        });
        passport.deserializeUser(function(obj, done) {
            done(null, obj);
        });

        passport.use(new TwitterStrategy({
                consumerKey : config.auth.twitterAuth.consumerKey,
                consumerSecret : config.auth.twitterAuth.consumerSecret,
                callbackURL: config.auth.twitterAuth.callbackURL
            }, function(token, tokenSecret, profile, done) {
                // To keep the example simple, the user's Twitter profile is returned to
                // represent the logged-in user. In a typical application, you would want
                // to associate the Twitter account with a user record in your database,
                // and return that user instead.
                profile.twitter_token = token;
                profile.twitter_token_secret = tokenSecret;
                //console.log(JSON.stringify(profile, null, 4));
                done(null,profile);
            }
        ));
};
})();
