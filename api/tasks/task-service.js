'use strict';

var Task = require('./task');


module.exports = {

  createTask: function(attrs) {
    attrs = ensureJSON(attrs);
    var task = new Task(attrs);
    return task.save();
  },

  deleteTask: function(id) {
    return Task.findById(id)
      .exec()
      .then(function(task){
        return task.remove();
      });
  },

  findTask: function(id) {
    return Task.findById(id).exec();
  },

  findAllTasks: function() {
    return Task.find().exec();
  },

  updateTask: function(id, attrs) {
    return Task.findById(id)
      .exec()
      .then(function(task){
        attrs = ensureJSON(attrs);
        return task.update(attrs);
      });
  }

};


function ensureJSON(data) {
  if (typeof data === 'string') data = JSON.parse(data);
  return data;
}
