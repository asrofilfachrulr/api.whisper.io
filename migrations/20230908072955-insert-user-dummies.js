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
  return db.runSql(`INSERT INTO user_bio VALUES 
  ('@id_dummy01', 'anya', 'Anya Sebastian', 'Spain', 'male', 1999, 'Dont look down on me because im small'),
  ('@id_dummy02', 'fachri', 'Joao Fachri', 'Portugal', 'male', 2002, 'This land is a holy land'),
  ('@id_dummy03', 'john', 'John Lao', 'Vietnam', 'male', 1994, 'Geurilla-tizen'),
  ('@id_dummy04', 'doe', 'Doe Mama', 'Italy', 'female', 1998, 'Mamamia Pizza'),
  ('@id_dummy05', 'budi', 'Budi Charles', 'Indonesia', 'male', 1986, 'Batik from Indonesia'),
  ('@id_dummy06', 'andi', 'Andi Coal', 'Mongolia', 'male', 2004, 'Used to be a World Dominator'),
  ('@id_dummy07', 'seto', 'Seto de Francis', 'Italy', 'male', 1997, 'Bread and Raspberry'),
  ('@id_dummy08', 'messi', 'Messi la Rodriguez', 'Argentina', 'female', 2010, 'Camera Wo Wo'),
  ('@id_dummy09', 'ronaldo', 'Ronaldo de Julia', 'Brazil', 'female', 2011, 'Siiuuuuu');
  `)
  .then(async function(result){
    db.runSql(`INSERT INTO credentials VALUES
    ('@id_dummy01', 'anya@whisper.io', '${await bcrypt.hash('anya',10)}'),
    ('@id_dummy02', 'fachri@whisper.io', '${await bcrypt.hash('fachri',10)}'),
    ('@id_dummy03', 'john@whisper.io', '${await bcrypt.hash('john',10)}'),
    ('@id_dummy04', 'doe@whisper.io', '${await bcrypt.hash('doe',10)}'),
    ('@id_dummy05', 'budi@whisper.io', '${await bcrypt.hash('budi',10)}'),
    ('@id_dummy06', 'andi@whisper.io', '${await bcrypt.hash('andi',10)}'),
    ('@id_dummy07', 'seto@whisper.io', '${await bcrypt.hash('seto',10)}'),
    ('@id_dummy08', 'messi@whisper.io', '${await bcrypt.hash('messi',10)}'),
    ('@id_dummy09', 'ronaldo@whisper.io', '${await bcrypt.hash('ronaldo',10)}');
    `)
  }, function(error) {
    console.log(error);
    db.runSql(`DELETE FROM user_bio WHERE id LIKE '@id_dummy%';`)
  })
};

exports.down = async function(db) {
  await db.runSql(`DELETE FROM user_bio WHERE id LIKE '@id_dummy%';`);
};

exports._meta = {
  "version": 1
};
