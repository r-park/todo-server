'use strict';

var database = require('./core/database');
var server = require('./core/server');


database.connect();
server.configure();
server.start();
