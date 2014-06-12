'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    passport = require('passport'),
    markers = require('./controllers/markers'),
    messages = require('./controllers/messages');


/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  app.route('/addMarker')
    .post(markers.create);

  app.route('/addMessage')
    .post(messages.create);

    app.route('/getmessage')
    .get(messages.getMessages);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

    app.route('/getmarker')
    .get(markers.getMarkers);

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);


  app.get('/auth/facebook', passport.authenticate('facebook', {scope : 'email' }));
  app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
          successRedirect : '/#main',
          failureRedirect : '/'
    }));
  app.route('/')
    .get( middleware.setUserCookie, index.index);




    console.log(app._router.stack);
};





