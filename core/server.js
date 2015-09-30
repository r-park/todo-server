'use strict';

var bodyParser = require('body-parser');
var compression = require('compression');
var express = require('express');
var helmet = require('helmet');
var logger = require('winston');
var morgan = require('morgan');


var app = express();


exports.configure = function() {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('combined'));
  }

  // gzip compression middleware
  app.use(compression({
    level: 6,
    threshold: 512,
    filter: function(req, res) {
      return (/css|javascript|json|svg|text/).test(res.getHeader('Content-Type'));
    }
  }));

  // body parsing middleware
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // HTTP header security middleware
  app.use(helmet.frameguard('deny'));
  app.use(helmet.hidePoweredBy());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  app.use(helmet.ieNoOpen());

  // load routers
  app.use(require('../api/tasks/router'));

  // application settings
  app.set('port', process.env.PORT || 8000);

  return app;
};


exports.start = function() {
  app.listen(app.get('port'), function(){
    logger.info('Express server listening on port', app.get('port'));
  });

  return app;
};
