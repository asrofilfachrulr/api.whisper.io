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
  return db.runSql(`INSERT INTO chats VALUES
  ('@chat_dummy01', '@id_dummy01', '@id_dummy03');`);
};

exports.down = function(db) {
  return db.runSql(`DELETE FROM friends WHERE user_id_1 = '@id_admin00'`);
};

exports._meta = {
  "version": 1
};
