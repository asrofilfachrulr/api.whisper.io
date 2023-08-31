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
  await db.runSql(`CREATE TABLE IF NOT EXISTS users (
      id varchar(255) primary key not null,
      username varchar(255) not null unique,
      full_name varchar(255) not null,
      password varchar(255) not null);
    `)
};

exports.down = async function(db) {
  await db.runSql('DROP TABLE IF EXISTS users;');
};

exports._meta = {
  "version": 1
};
