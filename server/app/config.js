(function() {'use strict';
    var twitterAuth = {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
    };

    module.exports = {
        server: {
            listenPort: 5000,
            staticUrl: '/public',
            indexHtml: '/public/index.html',
            cookieSecret: process.env.COOKIE_SECRET,
            sessionSecret: process.env.SESSION_SECRET,
        },
        auth: {
            twitterAuth : twitterAuth
        }
    };
})();
