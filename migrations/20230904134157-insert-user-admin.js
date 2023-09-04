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

exports.up = async function(db) {
  await db.runSql(`INSERT INTO users VALUES('@id_admin', 'admin@whisper.io', 'admin admin', 'admin');`);
};

exports.down = async function(db) {
  await db.runSql(`truncate table users;`);
};

exports._meta = {
  "version": 1
};
