'use strict';

var config = {
  development: {
    uri: 'mongodb://127.0.0.1:27017/tasks',
    options: {
      user: '',
      pass: ''
    }
  },

  test: {
    uri: 'mongodb://127.0.0.1:27017/tasks-test',
    options: {
      user: '',
      pass: ''
    }
  }
};

module.exports = config[process.env.NODE_ENV] || config.development;
