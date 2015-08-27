'use strict';

var database = require('../core/database');
var server = require('../core/server');


exports.db = {
  connect: database.connect,
  disconnect: database.disconnect,

  clear: function(Model, callback) {
    Model.remove({}, callback);
  },

  seed: function(Model, fixtures, callback) {
    fixtures.forEach(function(data){
      var model = new Model(data);
      model.save();
    });

    callback();
  }
};


exports.setup = function() {
  database.connect();
  return server.configure();
};
