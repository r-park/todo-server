'use strict';

var config = {
  development: {
    uri: 'mongodb://127.0.0.1:27017/todo-api',
    options: {
      user: '',
      pass: ''
    }
  },

  test: {
    uri: 'mongodb://127.0.0.1:27017/todo-api-test',
    options: {
      user: '',
      pass: ''
    }
  }
};

module.exports = config[process.env.NODE_ENV] || config.development;
