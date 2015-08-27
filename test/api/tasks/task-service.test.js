'use strict';

describe('Tasks: Task service', function(){
  var expect = require('chai').expect;
  var path = require('path');
  var Task = require(path.resolve('./api/tasks/task'));
  var taskService = require(path.resolve('./api/tasks/task-service'));
  var util = require(path.resolve('./test/util'));

  var task;


  before(function(){
    util.db.connect();
  });

  beforeEach(function(done){
    util.db.clear(Task, function(){
      task = new Task({completed: false, title: 'test'});
      task.save(done);
    });
  });

  after(function(done){
    util.db.disconnect(done);
  });


  describe('#createTask', function(){
    it('should fulfill promise with newly-created task', function(done){
      taskService
        .createTask({completed: false, title: 'task'})
        .then(function(task){
          expect(task.title).to.equal('task');
          done();
        });
    });

    it('should reject promise if validation fails', function(done){
      taskService
        .createTask({})
        .catch(function(error){
          expect(error).to.exist;
          done();
        });
    });
  });


  describe('#deleteTask', function(){
    it('should fulfill promise when task deletion succeeds', function(done){
      taskService
        .deleteTask(task._id)
        .then(function(){
          Task.findById(task._id, function(error, task){
            expect(task).to.not.exist;
            done();
          });
        });
    });

    it('should reject promise if task is not found', function(done){
      taskService
        .deleteTask(123)
        .catch(function(error){
          expect(error).to.exist;
          done();
        });
    });
  });


  describe('#findTask', function(){
    it('should fulfill promise with found task', function(done){
      taskService
        .findTask(task._id)
        .then(function(_task){
          expect(_task.id).to.equal(task.id);
          done();
        });
    });

    it('should reject promise if task is not found', function(done){
      taskService
        .findTask(123)
        .catch(function(error){
          expect(error).to.exist;
          done();
        });
    });
  });


  describe('#findAllTasks', function(){
    it('should fulfill promise with array of all tasks found', function(done){
      taskService
        .findAllTasks()
        .then(function(tasks){
          expect(Array.isArray(tasks)).to.equal(true);
          expect(tasks.length).to.equal(1);
          done();
        });
    });

    it('should fulfill promise with empty array if no tasks are found', function(done){
      Task.remove({}, function(){
        taskService
          .findAllTasks()
          .then(function(tasks){
            expect(Array.isArray(tasks)).to.equal(true);
            expect(tasks.length).to.equal(0);
            done();
          });
      });
    });
  });


  describe('#updateTask', function(){
    it('should fulfill promise with updated task', function(done){
      taskService
        .updateTask(task._id, {title: 'foo'})
        .then(function(_task){
          expect(_task.id).to.equal(task.id);
          expect(_task.title).to.equal('foo');
          done();
        });
    });

    it('should reject promise if task is not found', function(done){
      taskService
        .updateTask(123)
        .catch(function(error){
          expect(error).to.exist;
          done();
        });
    });

    it('should reject promise if validation fails', function(done){
      taskService
        .updateTask(task._id, {title: ''})
        .catch(function(error){
          expect(error).to.exist;
          done();
        });
    });
  });

});
