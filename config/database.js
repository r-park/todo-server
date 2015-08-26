'use strict';

var config = {
  development: {
    uri: 'mongodb://localhost:27017/todo-api',
    options: {
      user: '',
      pass: ''
    }
  },

  test: {
    uri: 'mongodb://localhost:27017/todo-api-test',
    options: {
      user: '',
      pass: ''
    }
  }
};

module.exports = config[process.env.NODE_ENV] || config.development;
