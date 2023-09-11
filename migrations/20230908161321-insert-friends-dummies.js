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
  return db.runSql(`INSERT INTO friends VALUES
  ('1', '@id_admin00', '@id_dummy01'),
  ('2', '@id_admin00', '@id_dummy02'),
  ('3', '@id_admin00', '@id_dummy03'),
  ('4', '@id_admin00', '@id_dummy04'),
  ('5', '@id_admin00', '@id_dummy05'),
  ('6', '@id_admin00', '@id_dummy06'),
  ('7', '@id_admin00', '@id_dummy07'),
  ('8', '@id_admin00', '@id_dummy08'),
  ('9', '@id_admin00', '@id_dummy09');`);
};

exports.down = function(db) {
  return db.runSql(`DELETE FROM friends WHERE user_id_1 = '@id_admin00'`);
};

exports._meta = {
  "version": 1
};
