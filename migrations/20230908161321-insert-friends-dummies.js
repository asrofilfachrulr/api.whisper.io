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
  ('2', '@id_dummy01', '@id_dummy02'),
  ('3', '@id_dummy03', '@id_dummy01'),
  ('4', '@id_dummy01', '@id_dummy04'),
  ('5', '@id_dummy05', '@id_dummy01'),
  ('6', '@id_dummy01', '@id_dummy06'),
  ('7', '@id_dummy01', '@id_dummy07'),
  ('8', '@id_dummy08', '@id_dummy01'),
  ('9', '@id_dummy01', '@id_dummy09');`);
};

exports.down = function(db) {
  return db.runSql(`DELETE FROM friends WHERE user_id_1 = '@id_dummy01'`);
};

exports._meta = {
  "version": 1
};
