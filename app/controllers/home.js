var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

    res.json('200', {
      timestamp: new Date(),
      message: "The todo demo"
    });
});
