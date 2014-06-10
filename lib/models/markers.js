'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MarkerSchema = new Schema({
  userId: String,
  userEmail: String,
  image: String,
  latlng: {latitude: Number,
  longitude: Number}
  // createdAt: { type: Date, expires: '3600', default: Date.now()}
});

mongoose.model('Markers', MarkerSchema);

