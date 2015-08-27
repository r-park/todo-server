'use strict';

var express = require('express');
var logger = require('winston');
var taskService = require('./task-service');

var router = new express.Router();
module.exports = router;


router.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin, X-Requested-With');
  next();
});


router.post('/tasks', function(req, res){
  taskService
    .createTask(req.body)
    .then(function(task){
      res.status(201).json(task);
    })
    .catch(function(error){
      logger.error('POST /tasks :', error);
      res.status(400).end();
    });
});


router.get('/tasks', function(req, res){
  taskService
    .findAllTasks()
    .then(function(tasks){
      res.status(200).json(tasks);
    })
    .catch(function(error){
      logger.error('GET /tasks :', error);
      res.status(400).end();
    });
});


router.get('/tasks/:id', function(req, res){
  taskService
    .findTask(req.params.id)
    .then(function(task){
      res.status(200).json(task);
    })
    .catch(function(error){
      logger.error('GET /tasks/' + req.params.id, ':', error);
      res.status(400).end();
    });
});


router.put('/tasks/:id', function(req, res){
  taskService
    .updateTask(req.params.id, req.body)
    .then(function(task){
      res.status(200).json(task);
    })
    .catch(function(error){
      logger.error('PUT /tasks/' + req.params.id, ':', error);
      res.status(400).end();
    });
});


router.delete('/tasks/:id', function(req, res){
  taskService
    .deleteTask(req.params.id)
    .then(function(){
      res.status(204).end();
    })
    .catch(function(error){
      logger.error('DELETE /tasks/' + req.params.id, ':', error);
      res.status(400).end();
    });
});
