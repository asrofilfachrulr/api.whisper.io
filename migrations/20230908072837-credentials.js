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
  return db.createTable('credentials', {
    user_id: {
      type: 'varchar(255)',
      notNull: true,
      foreignKey: {
        name: 'user_bio-users_id_fk',
        table: 'user_bio',
        rules: {
          onDelete: 'CASCADE',
        },
        mapping: 'id'
      }
    },
    email: {
      type: 'varchar(100)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'varchar(255)',
      notNull: true,
      defaultValue: '$2b$10$5W2TkcGuCBKXrSoA6gkDwOnVTUWndPortxrGntQIJY.pjZVfRxiQG' //password
    }
  });
};

exports.down = function(db) {
  return db.dropTable('credentials');
};

exports._meta = {
  "version": 1
};
