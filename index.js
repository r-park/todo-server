'use strict';

var database = require('./core/database');
var server = require('./core/server');


exports.start = function() {
  database.connect();
  server.configure();
  server.start();
};

