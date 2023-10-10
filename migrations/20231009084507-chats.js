'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('chats', {
    id: { type: 'varchar(255)', primaryKey: true },
    participant_1: {
      type: 'varchar(255)',
      notNull: false,
      foreignKey: {
        name: 'chats_participant_1-users_id_fk',
        table: 'users',
        rules: {
          onDelete: 'SET NULL',
        },
        mapping: 'id'
      }
    },
    participant_2: {
      type: 'varchar(255)',
      notNull: false,
      foreignKey: {
        name: 'chats_participant_2-users_id_fk',
        table: 'users',
        rules: {
          onDelete: 'SET NULL',
        },
        mapping: 'id'
      }
    }
  }).then(function(result){
    db.runSql('ALTER TABLE chats ADD CONSTRAINT unique_participants UNIQUE (`participant_1`, `participant_2`);')
  }, function(error){
    return
  });
};

exports.down = function (db) {
  return db.dropTable('chats');
};

exports._meta = {
  "version": 1
};
