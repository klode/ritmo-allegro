var express = require('express');
var app = express();
var logger = require('morgan');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride =  require('method-override');
var config = require(__dirname + '/app/config.js');


app.set('port', (process.env.PORT || config.server.listenPort));
app.use(express.static(__dirname + config.server.staticUrl));

app.use(logger('dev'));

// set up express application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.server.cookieSecret));
app.use(methodOverride());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.server.sessionSecret
}));

//setup passport
app.use(passport.initialize());
app.use(passport.session());
require(__dirname + '/app/passportConfig.js')(passport, config);

//routes
require(__dirname + '/app/routes.js')(app, passport);

//serve single page app index.html in html5 mode
app.use('*', function(req, res) {
    res.sendFile(path.join(__dirname + config.server.indexHtml));
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

