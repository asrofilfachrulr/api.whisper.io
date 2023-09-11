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
  return db.createTable('user_bio',{
    id: {
      type: 'varchar(255)',
      primaryKey: true,
      notNull: true,
    },
    username: {
      type: 'varchar(255)',
      notNull: true,
    },
    full_name: {
      type: 'varchar(255)',
      notNull: true,
    },
    country: {
      type: 'varchar(255)',
      defaultValue: 'USA'
    },
    gender: {
      type: 'varchar(10)',
      defaultValue: 'male'
    },
    birth_year: {
      type: 'int',
      notNull: true,
    },
    bio: {
      type: 'varchar(255)',
      notNull: false
    }
  })
};

exports.down = function(db) {
  return db.dropTable('user_bio');
};

exports._meta = {
  "version": 1
};
