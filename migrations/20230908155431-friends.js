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
  return db.createTable('friends', {
    id: {
      type: 'int',
      autoIncrement: true,
      unsigned: true,
      primaryKey: true,
    },
    user_id_1: {
      type: 'varchar(255)',
      notNull: true,
      foreignKey: {
        name: 'friends_1-users_id_fk',
        table: 'user_bio',
        rules: {
          onDelete: 'CASCADE',
        },
        mapping: 'id'
      }
    },
    user_id_2: {
      type: 'varchar(255)',
      notNull: true,
      foreignKey: {
        name: 'friends_1-users_id_fk',
        table: 'user_bio',
        rules: {
          onDelete: 'CASCADE',
        },
        mapping: 'id'
      }
    },
  }).then(function(result){
    db.runSql('ALTER TABLE friends ADD CONSTRAINT unique_friend_id-user_id UNIQUE (user_id_1, user_id_2);')
  }, function(error){
    return
  })
};

exports.down = function(db) {
  return db.dropTable('friends');
};

exports._meta = {
  "version": 1
};
