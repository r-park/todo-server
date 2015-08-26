'use strict';

var mongoose = require('mongoose');
var logger = require('winston');
var config = require('../config/database');


mongoose.Promise = require('bluebird');


exports.connect = function() {
  mongoose.connect(config.uri, config.options, function(error){
    if (error) logger.error('Could not connect to mongoDB!', error);
  });

  mongoose.connection.on('error', function(error){
    logger.error('mongoDB connection error:', error);
    process.exit(-1);
  });
};


exports.disconnect = function(callback) {
  mongoose.disconnect(callback);
};
