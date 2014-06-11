'use strict';

var mongoose = require('mongoose'),
    message = mongoose.model('Messages');


exports.create = function (req, res) {
  var newMessage = new message(req.body);
  newMessage.save(function(err){
          if(err) {
            return res.json(400, err)
          } else {
            console.log('New message saved.');
            return res.json(newMessage);
          }
  });
};

exports.getMessages = function (req, res) {
  message.find(function(err, messages) {
    res.json({messages: messages});
  });
};
