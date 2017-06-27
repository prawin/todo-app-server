'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('todos', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, index: true },
    title: {type: 'string', length: 150},
    description: {type: 'string', length: 250},
    due_date: {type: 'date'},
    created_at: 'datetime',
    updated_at: 'datetime'
  })

};

exports.down = function(db) {
  return db.dropTable('todos');
};

exports._meta = {
  "version": 1
};
