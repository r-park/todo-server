'use strict';

var express = require('express');
var logger = require('winston');
var taskService = require('./task-service');


var router = new express.Router();
module.exports = router;


/**
 * Default CORS headers
 */
router.use(function(request, response, next){
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS, POST, PUT');
  response.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin, X-Requested-With');
  next();
});


router.post('/tasks', function(request, response){
  taskService
    .createTask(request.body)
    .then(function(task){
      response
        .status(201)
        .json(task);
    })
    .catch(function(error){
      logger.error('POST /tasks :', error);
      response
        .status(400)
        .end();
    });
});


router.get('/tasks', function(request, response){
  taskService
    .findAllTasks()
    .then(function(tasks){
      response
        .status(200)
        .json(tasks);
    })
    .catch(function(error){
      logger.error('GET /tasks :', error);
      response
        .status(400)
        .end();
    });
});


router.get('/tasks/:id', function(request, response){
  taskService
    .findTask(request.params.id)
    .then(function(task){
      response
        .status(200)
        .json(task);
    })
    .catch(function(error){
      logger.error('GET /tasks/' + request.params.id, ':', error);
      response
        .status(400)
        .end();
    });
});


router.put('/tasks/:id', function(request, response){
  taskService
    .updateTask(request.params.id, request.body)
    .then(function(){
      response
        .status(200)
        .end();
    })
    .catch(function(error){
      logger.error('PUT /tasks/' + request.params.id, ':', error);
      response
        .status(400)
        .end();
    });
});


router.delete('/tasks/:id', function(request, response){
  taskService
    .deleteTask(request.params.id)
    .then(function(){
      response
        .status(204)
        .end();
    })
    .catch(function(error){
      logger.error('DELETE /tasks/' + request.params.id, ':', error);
      response
        .status(400)
        .end();
    });
});
