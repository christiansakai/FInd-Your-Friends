'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MarkerSchema = new Schema({
  name: String,
  userId: String,
  userEmail: String,
  image: String,
  latlng: {latitude: Number,
  longitude: Number},
  test_expira : { type : Date, default : Date.now, index : { expires : 3600 }}
  // createdAt: { type: Date, expireAfterSeconds: '3600', default: Date.now()}
});


mongoose.model('Markers', MarkerSchema);

