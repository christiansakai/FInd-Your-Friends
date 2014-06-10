'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    io = require('socket.io');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// Populate empty DB with sample data


// Passport Configuration
var passport = require('./lib/config/passport');

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

// Start server
var server = app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

var socket = io(server);
socket.on('connection', function(socket) {
  console.log("connected");
  socket.on('pin drop', function(data) {
    // console.log(data);
    socket.broadcast.emit('pin drop', data);
  });
  // socket to emit message when received
  socket.on('message', function(msg) {
    // console.log(msg);
    socket.broadcast.emit('message', msg.msg);
  });
});


// Expose app
exports = module.exports = app;
