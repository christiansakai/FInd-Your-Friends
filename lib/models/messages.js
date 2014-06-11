'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
    msg: String,
    pic: String
});

mongoose.model('Messages', MessageSchema);
