# Ritmo Allegro App

An Angular application I wrote to experiment with Twitter authentication, Twitter API, and Heroku deployment.

## The Stack

- Angular
- Bootstrap
- Node with [Express 4](http://expressjs.com/).
- [Passport](http://passportjs.org/guide/) with [TwitterStrategy](http://passportjs.org/guide/twitter/) for authentication.
- [Twitter API](https://dev.twitter.com/rest/public)
- Heroku

## Live App

https://ritmo-allegro.herokuapp.com

## Initial Setup

Make sure you complete these steps before running the application

#####(1) Create a Twitter application
In order to use Twitter authentication, you must first create an application at [Twitter Developers](https://apps.twitter.com/). When created, an application is assigned a *consumer key* and *consumer secret*. Your application must also implement a *callback URL*, to which Twitter will redirect users after they have approved access for your application.
- If you run the app locally, set the callback to "http://127.0.0.1:5000/auth/twitter/callback".
- If you run the app on heroku, set the callback to "https://the-app-name.herokuapp.com/auth/twitter/callback". Where `the-app-name` is the [name of your heroku app](#Deploy-to-Heroku)

#####(2) Set environment variables
Create the following environment variables and set them equal to consumer_key, consumer_secret, and callback_url of the Twitter application you just created in step (1). Also set your cookie and session secrets.
- TWITTER_CONSUMER_KEY
- TWITTER_CONSUMER_SECRET
- TWITTER_CALLBACK_URL
- COOKIE_SECRET,
- SESSION_SECRET,


## Run Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ npm install
$ bower install
$ grunt dist
$ node dist/server.js
```

The app should now be running on [localhost:5000](http://localhost:5000/).


## Deploy to Heroku

 Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```
$ cd dist/
$ heroku create the-app-name
$ git push heroku master
$ heroku open
```
The app should now be running on https://the-app-name.herokuapp.com

## Documentation

For more information about using Twitter auth and api.

- [Twitter Developers](https://apps.twitter.com/)
- [Twitter REST APIs](https://dev.twitter.com/rest/public)

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
- [Deploying with Git](https://devcenter.heroku.com/articles/git)
