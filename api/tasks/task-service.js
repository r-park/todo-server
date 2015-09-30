'use strict';

var Task = require('./task');


module.exports = {

  createTask: function(attrs) {
    var task = new Task(attrs);
    return task.save();
  },

  deleteTask: function(id) {
    return Task.findByIdAndRemove(id).exec();
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
        return task.update(attrs);
      });
  }

};
