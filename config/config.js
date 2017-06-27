var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
    db_name = 'todo_app_node'

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'todo-app-node'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root@localhost/'+db_name+'_development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'todo-app-node'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root@localhost/'+db_name+'-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'todo-app-node'
    },
    port: process.env.PORT || 3000,
    db: process.env.CLEARDB_DATABASE_URL
  }
};

module.exports = config[env];
