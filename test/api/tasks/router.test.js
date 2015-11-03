'use strict';

describe('Tasks: router', function(){
  var expect = require('chai').expect;
  var path = require('path');
  var request = require('supertest');
  var Task = require(path.resolve('./api/tasks/task'));
  var util = require(path.resolve('./test/util'));


  before(function(){
    request = request(util.setup());
  });

  beforeEach(function(done){
    util.db.clear(Task, done);
  });

  after(function(done){
    util.db.disconnect(done);
  });


  /*=======================================================
    POST /tasks
  -------------------------------------------------------*/
  describe('POST /tasks', function(){
    var task = {completed: false, title: 'test'};
    var url = '/tasks';

    describe('response', function(){
      it('should return newly created task', function(done){
        request
          .post(url)
          .send(task)
          .expect(201)
          .end(function(error, response){
            var _task = response.body;
            expect(_task.completed).to.equal(false);
            expect(_task.title).to.equal('test');
            expect(_task.id).to.exist;
            expect(_task.links.self).to.equal('/tasks/' + _task.id);
            done(error);
          });
      });

      it('should return status 400 if task creation fails', function(done) {
        request
          .post(url)
          .send({})
          .expect(400, done);
      });
    });

    describe('response headers', function(){
      it('should include `Access-Control-Allow-Origin`', function(done){
        request
          .post(url)
          .send(task)
          .expect(201)
          .expect('Access-Control-Allow-Origin', '*', done);
      });

      it('should include `Access-Control-Allow-Methods`', function(done){
        request
          .post(url)
          .send(task)
          .expect(201)
          .expect('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS, POST, PUT', done);
      });

      it('should include `Access-Control-Allow-Headers`', function(done){
        request
          .post(url)
          .send(task)
          .expect(201)
          .expect('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin, X-Requested-With', done);
      });
    });
  });


  /*=======================================================
    GET /tasks
  -------------------------------------------------------*/
  describe('GET /tasks', function(){
    var url = '/tasks';

    describe('response', function(){
      it('should return array of found tasks', function(done){
        util.db.seed(Task, [
          {completed: false, title: 'task-1'},
          {completed: false, title: 'task-2'},
          {completed: false, title: 'task-3'}
        ], function(){
          request
            .get(url)
            .expect(200)
            .end(function(error, response){
              var tasks = response.body;
              expect(Array.isArray(tasks)).to.equal(true);
              expect(tasks.length).to.equal(3);
              done(error);
            });
        });
      });

      it('should return empty array if no tasks are found', function(done){
        request
          .get(url)
          .expect(200)
          .expect([], done);
      });
    });

    describe('response headers', function(){
      it('should include `Access-Control-Allow-Origin`', function(done){
        request
          .get(url)
          .expect(200)
          .expect('Access-Control-Allow-Origin', '*', done);
      });

      it('should include `Access-Control-Allow-Methods`', function(done){
        request
          .get(url)
          .expect(200)
          .expect('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS, POST, PUT', done);
      });

      it('should include `Access-Control-Allow-Headers`', function(done){
        request
          .get(url)
          .expect(200)
          .expect('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin, X-Requested-With', done);
      });
    });
  });


  /*=======================================================
    GET /tasks/:id
  -------------------------------------------------------*/
  describe('GET /tasks/:id', function(){
    var task, url;

    beforeEach(function(){
      task = new Task({completed: false, title: 'test'});
      task.save();
      url = '/tasks/' + task.id;
    });

    describe('response', function(){
      it('should return found task', function(done){
        request
          .get(url)
          .expect(200)
          .end(function(error, response){
            var _task = response.body;
            expect(_task.id).to.equal(task.id);
            done(error);
          });
      });

      it('should return status 400 if task is not found', function(done){
        request
          .get('/tasks/123')
          .expect(400, done);
      });
    });

    describe('response header', function(){
      it('should include `Access-Control-Allow-Origin`', function(done){
        request
          .get(url)
          .expect(200)
          .expect('Access-Control-Allow-Origin', '*', done);
      });

      it('should include `Access-Control-Allow-Methods`', function(done){
        request
          .get(url)
          .expect(200)
          .expect('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS, POST, PUT', done);
      });

      it('should include `Access-Control-Allow-Headers`', function(done){
        request
          .get(url)
          .expect(200)
          .expect('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin, X-Requested-With', done);
      });
    });
  });


  /*=======================================================
    PUT /tasks/:id
  -------------------------------------------------------*/
  describe('PUT /tasks/:id', function(){
    var changes, task, url;

    beforeEach(function(){
      changes = {title: 'changed'};
      task = new Task({completed: false, title: 'test'});
      task.save();
      url = '/tasks/' + task.id;
    });

    describe('response', function(){
      it('should return updated task', function(done){
        request
          .put(url)
          .send(changes)
          .expect(200)
          .end(function(error, response){
            var _task = response.body;
            expect(_task.id).to.equal(task.id);
            expect(_task.title).to.equal(changes.title);
            done();
          });
      });

      it('should return status 400 if task is not found', function(done){
        request
          .put('/tasks/123')
          .send(changes)
          .expect(400, done);
      });

      it('should return status 400 if task validation fails', function(done){
        request
          .put(url)
          .send({title: ''})
          .expect(400, done);
      });
    });

    describe('response headers', function(){
      it('should include `Access-Control-Allow-Origin`', function(done){
        request
          .put(url)
          .send(changes)
          .expect(200)
          .expect('Access-Control-Allow-Origin', '*', done);
      });

      it('should include `Access-Control-Allow-Methods`', function(done){
        request
          .put(url)
          .send(changes)
          .expect(200)
          .expect('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS, POST, PUT', done);
      });

      it('should include `Access-Control-Allow-Headers`', function(done){
        request
          .put(url)
          .send(changes)
          .expect(200)
          .expect('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin, X-Requested-With', done);
      });
    });
  });


  /*=======================================================
    DELETE /tasks/:id
  -------------------------------------------------------*/
  describe('DELETE /tasks/:id', function(){
    var task, url;

    beforeEach(function(){
      task = new Task({completed: false, title: 'test'});
      task.save();
      url = '/tasks/' + task.id;
    });

    describe('response', function(){
      it('should return status 204 if deletion succeeds', function(done){
        request
          .del(url)
          .expect(200, done);
      });

      it('should return status 400 if deletion fails', function(done){
        request
          .del('/tasks/123')
          .expect(400, done);
      });
    });

    describe('response headers', function(){
      it('should include `Access-Control-Allow-Origin`', function(done){
        request
          .del(url)
          .expect(200)
          .expect('Access-Control-Allow-Origin', '*', done);
      });

      it('should include `Access-Control-Allow-Methods`', function(done){
        request
          .del(url)
          .expect(200)
          .expect('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS, POST, PUT', done);
      });

      it('should include `Access-Control-Allow-Headers`', function(done){
        request
          .del(url)
          .expect(200)
          .expect('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin, X-Requested-With', done);
      });
    });
  });

});
