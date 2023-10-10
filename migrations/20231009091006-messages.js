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
  return db.createTable('messages', {
    id: { type: 'varchar(255)', primaryKey: true },
    chat_id: { 
      type: 'varchar(255)', 
      notNull: false ,
      foreignKey: {
        name: 'messages_chat_id-chats_id_fk',
        table: 'chats',
        rules: {
          onDelete: 'SET NULL',
        },
        mapping: 'id'
      }
    },
    sender_id: { 
      type: 'varchar(255)', 
      notNull: false,
      foreignKey: {
        name: 'messages_sender_id-users_id_fk',
        table: 'users',
        rules: {
          onDelete: 'SET NULL',
        },
        mapping: 'id'
      } 
    },
    content: { type: 'varchar(255)', notNull: true },
    time: { type: 'datetime', notNull: true },
    isRead: { type: 'boolean', defaultValue: false },
    isDelivered: { type: 'boolean', defaultValue: false },
  });
};

exports.down = function (db) {
  return db.dropTable('messages');
};

exports._meta = {
  "version": 1
};
