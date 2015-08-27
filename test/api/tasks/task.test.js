'use strict';

describe('Tasks: Task model', function(){
  var expect = require('chai').expect;
  var path = require('path');
  var Task = require(path.resolve('./api/tasks/task'));
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


  describe('schema validation', function(){
    it('should pass when valid attributes are provided', function(done){
      var task = new Task({completed: false, title: 'pass'});
      task.save()
        .then(function(task){
          expect(task).to.exist;
          done();
        });
    });

    it('should fail when `completed` is undefined', function(done){
      var task = new Task({title: 'fail'});
      task.save()
        .catch(function(error){
          expect(error).to.exist;
          done();
        });
    });

    it('should fail when `title` is undefined', function(done){
      var task = new Task({completed: false});
      task.save()
        .catch(function(error){
          expect(error).to.exist;
          done();
        });
    });

    it('should fail when `title` is empty', function(done){
      var task = new Task({completed: false, title: '  '});
      task.save()
        .catch(function(error){
          expect(error).to.exist;
          done();
        });
    });
  });


  describe('#links virtual property', function(){
    it('should return url to self', function(){
      expect(task.links.self).to.equal('/tasks/' + task._id);
    });
  });


  describe('#toJSON', function(){
    it('should remove version property `__v`', function(){
      var json = task.toJSON();
      expect(json.__v).to.not.exist;
    });

    it('should remove property `_id`', function(){
      var json = task.toJSON();
      expect(json._id).to.not.exist;
    });

    it('should include boolean property `completed`', function(){
      var json = task.toJSON();
      expect(json.completed).to.equal(false);
    });

    it('should include string property `title`', function(){
      var json = task.toJSON();
      expect(json.title).to.equal('test');
    });

    it('should include virtual property `id`', function(){
      var json = task.toJSON();
      expect(json.id).to.equal(task._id + '');
    });

    it('should include virtual property `links`', function(){
      var json = task.toJSON();
      expect(json.links.self).to.equal('/tasks/' + task._id);
    });
  });

});
