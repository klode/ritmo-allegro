(function(){'use strict';
    var querystring = require('querystring');

    module.exports = function(app, passport) {
        // twitter auth
        app.get('/auth/twitter', passport.authenticate('twitter'));
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect: '/user/profile',
                failureRedirect: '/login'
            })
        );
        app.post('/logout', function(req, res) {
            req.logOut();
            res.redirect('/');
        });

        // JSON API
        app.get('/api/twitter/trends/worldwide', isLoggedIn, function (req, res) {
            getTwitterTrendsWorldwide(req, function (err, data) {
                if(err) {
                    console.log(err);
                    res.status(500).send(error);
                    return;
                }
                //console.log('PROCESSED DATA', data);
                res.send(data);
            });
        });
        app.get('/api/twitter/search', isLoggedIn, function (req, res) {
            var query = querystring.stringify(req.query);
            getTwitterSearch(req, query, function (err, data) {
                if(err) {
                    console.log(err);
                    res.status(500).send(error);
                    return;
                }
                res.send(data);
            });
        });

        app.get('/current-user', function (req, res, next) {
            var user = req.user;

            // console.log('Serving the current-user: ' +
            // JSON.stringify(user, null, 4));

            if (user) {
                res.send({name: user.screen_name || 'username'});
            } else {
                res.send(null);
            }
        });

        // route middleware to make sure a user is logged in
        function isLoggedIn(req, res, next) {
            //console.log('isAuthenticated:', req.isAuthenticated() );
            // if user is authenticated in the session, carry on
            if (req.isAuthenticated())
                return next();

            // if they aren't redirect them to the home page
            res.redirect('/');
        }

        // twitter api methods
        function getTwitterTrendsWorldwide(req, callback) {
            var uri = 'https://api.twitter.com/1.1/trends/place.json?id=1';

            doTwitterSecureRequest(
                uri,
                req.user.twitter_token,
                req.user.twitter_token_secret,
                function (err, data) {
                    var results = JSON.parse(data);
                    callback(err, results[0]);
                }
            );
        }

        function getTwitterSearch(req, query, callback) {
            var uri = 'https://api.twitter.com/1.1/search/tweets.json?' + query;

            doTwitterSecureRequest(
                uri,
                req.user.twitter_token,
                req.user.twitter_token_secret,
                function (err, data) {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    var results = [];
                    var jsonData = JSON.parse(data);
                    for (var i = 0; i < jsonData.statuses.length; i++) {
                        var item = jsonData.statuses[i];
                        results.push({
                            userScreenName: item.user && item.user.screen_name,
                            userProfileImageUrl: item.user && item.user.profile_image_url,
                            text: item.text
                        });
                    }
                    callback(err, results);
                }
            );
        }

        function doTwitterSecureRequest(uri, twitterToken, twitterTokenSecret, callback) {
            console.log(uri);
            passport._strategies.twitter._oauth._performSecureRequest(
                twitterToken,
                twitterTokenSecret,
                'GET',
                uri,
                null,
                null, null, callback);
        }

    };
})();
