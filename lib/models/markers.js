'use strict';

var mongoose = require('mongoose'),
    ttl = require('mongoose-ttl'),
    Schema = mongoose.Schema;

var MarkerSchema = new Schema({
  name: String,
  userId: String,
  userEmail: String,
  image: String,
  latlng: {latitude: Number,
  longitude: Number}
  // createdAt: { type: Date, expires: '3600', default: Date.now()}
});

MarkerSchema.plugin(ttl, { ttl: 3600 });

mongoose.model('Markers', MarkerSchema);

