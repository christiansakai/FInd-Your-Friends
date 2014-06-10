'use strict';

var mongoose = require('mongoose'),
    marker = mongoose.model('Markers');


exports.create = function (req, res) {
  var newMarker = new marker(req.body);
  marker.find({userEmail: req.body.userEmail}, function(err, mark){
    if(mark.length > 0){
      console.log('New marker being created');
      marker.find({userEmail: req.body.userEmail}).remove(function(){
        console.log('Old marker removed.');
        newMarker.save(function(err){
          if(err) {
            return res.json(400, err)
          } else {
            console.log('New marker saved.');
            return res.json(newMarker)
          }
        });
      });
    } else {
      newMarker.save(function(err) {
        if (err) return res.json(400, err);
        else {
          return res.json(newMarker);
        }
      });
    }
  });
  // console.log(req.body);
};

exports.getMarkers = function (req, res) {
  marker.find(function(err, markers) {
    console.log(markers);
    res.json({markers: markers});
  });
};

