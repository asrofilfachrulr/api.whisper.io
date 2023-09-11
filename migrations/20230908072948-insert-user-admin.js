'use strict';
const bcrypt = require('bcrypt')

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
  return db.insert('user_bio', 
  ['id', 'username', 'full_name', 'birth_year'],
  ['@id_admin00', 'admin', 'admin whisper.io', 1999])
  .then(async function(result){
    db.insert('credentials', 
    ['user_id', 'email', 'password'],
    ['@id_admin00', 'admin@whisper.io', await bcrypt.hash('admin', 10)]);
  }, function(err) {
    return
  })
};

exports.down = function(db) {
  return db.runSql('DELETE FROM user_bio WHERE id = @id_admin00;');
};

exports._meta = {
  "version": 1
};
