var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/api/todos', function (req, res, next) {
  var query_options = {order: [['created_at', 'DESC']]}
  var filter_options = {}
  var from_due_date = req.body.from_due_date || req.query.from_due_date
  var to_due_date = req.body.to_due_date || req.query.to_due_date
  if(from_due_date)
    filter_options = Object.assign(filter_options, {$gte: from_due_date})
  if(to_due_date)
    filter_options = Object.assign(filter_options, {$lte: to_due_date})
  if(Object.keys(filter_options).length > 0)
    query_options = Object.assign(query_options, {where: {due_date: filter_options}})

  db.Todo.findAll(query_options).then(function (todos) {
    res.json('200', {
      timestamp: new Date(),
      todos: todos
    });
  });
});

router.post('/api/todos', function (req, res, next) {
  db.Todo.create(req.body).then(function (todo) {
    res.json('200', {
      timestamp: new Date(),
      todos: todo
    });
  }).catch(function(err) {
    res.status(422).json({
      timestamp: new Date(),
      error: "All fields are required."
    });
  })
});


router.get('/api/todos/:id', function (req, res, next) {
  db.Todo.findById(req.params.id).then(function (todo) {
    if (!todo) {
        return res.status(404).json({
          timestamp: new Date(),
          error: 'Todo Not Found'
        });
      }
    else {
      res.status('200').json({
        timestamp: new Date(),
        todo: todo
      });
    }
  })
});

router.put('/api/todos/:id', function (req, res, next) {
  db.Todo.findById(req.params.id).then(function (todo) {
    if (!todo) {
        return res.status(404).json({
          timestamp: new Date(),
          error: 'Todo Not Found'
        });
      }
    else {
      return todo.update(req.body).then(function(todo){
        res.status(404).json({
          timestamp: new Date(),
          message: 'Todo updated',
          todo: todo
        });
      }).catch(function(err){
        res.status(422).json({
          timestamp: new Date(),
          error: 'Problem updating'
        });
      })
    }
  })
});

router.delete('/api/todos/:id', function (req, res, next) {
  db.Todo.findById(req.params.id).then(function (todo) {
    if (!todo) {
        return res.status(404).json({
          timestamp: new Date(),
          error: 'Todo Not Found'
        });
      }
    return todo.destroy().then(function(todo){
      res.status('200').json({
        timestamp: new Date(),
        message: "Todo deleted successfully!",
        todo: todo
      });
    })
  })
});
