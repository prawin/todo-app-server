var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/api/todos', function (req, res, next) {
  db.Todo.findAll({order: [['created_at', 'DESC']]}).then(function (todos) {
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
    console.log(err)
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
