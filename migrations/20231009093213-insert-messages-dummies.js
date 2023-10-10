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
  const toDateTime = (d) => d.slice(0, 19).replace('T', ' ')
  
  return db.runSql(`
  INSERT INTO messages (id, chat_id, sender_id, content, time, isRead, isDelivered)
VALUES
  ('message-0', '@chat_dummy01', '@id_dummy01', 'Hi, how''s your day going?', '${toDateTime('2023-09-21T01:00:00.000Z')}', '1', '1'),
  ('message-1', '@chat_dummy01', '@id_dummy03', 'I''m doing well, thanks for asking!', '${toDateTime('2023-09-22T01:05:00.000Z')}', '1', '1'),
  ('message-2', '@chat_dummy01', '@id_dummy01', 'What have you been up to lately?', '${toDateTime('2023-09-22T01:10:00.000Z')}', '1', '1'),
  ('message-3', '@chat_dummy01', '@id_dummy03', 'I''ve been working on some exciting projects.', '${toDateTime('2023-09-22T01:15:00.000Z')}', '1', '1'),
  ('message-4', '@chat_dummy01', '@id_dummy01', 'That sounds interesting! Tell me more.', '${toDateTime('2023-09-22T01:20:00.000Z')}', '1', '1'),
  ('message-5', '@chat_dummy01', '@id_dummy03', 'I''m working on a new website and a mobile app.', '${toDateTime('2023-09-22T01:25:00.000Z')}', '1', '1'),
  ('message-6', '@chat_dummy01', '@id_dummy01', 'Wow, that sounds like a lot of work. Any specific features you are adding?', '${toDateTime('2023-09-22T01:30:00.000Z')}', '1', '1'),
  ('message-7', '@chat_dummy01', '@id_dummy03', 'Yes, I am adding real-time chat functionality to the app.', '${toDateTime('2023-09-22T01:35:00.000Z')}', '1', '1'),
  ('message-8', '@chat_dummy01', '@id_dummy01', 'That will be really useful! When do you plan to launch it?', '${toDateTime('2023-09-22T01:40:00.000Z')}', '1', '1'),
  ('message-9', '@chat_dummy01', '@id_dummy03', 'I''m aiming to launch it next month.', '${toDateTime('2023-09-22T01:45:00.000Z')}', '1', '1'),
  ('message-10', '@chat_dummy01', '@id_dummy01', 'Great! Let me know if you need any help with testing or feedback.', '${toDateTime('2023-09-22T01:50:00.000Z')}', '1', '1'),
  ('message-11', '@chat_dummy01', '@id_dummy03', 'Thanks, I''ll definitely reach out for feedback.', '${toDateTime('2023-09-22T01:55:00.000Z')}', '1', '1'),
  ('message-12', '@chat_dummy01', '@id_dummy01', 'How''s the weather there today?', '${toDateTime('2023-09-23T02:00:00.000Z')}', '1', '1'),
  ('message-13', '@chat_dummy01', '@id_dummy03', 'It''s a sunny day with clear skies!', '${toDateTime('2023-09-23T02:05:00.000Z')}', '1', '1'),
  ('message-14', '@chat_dummy01', '@id_dummy01', 'Lucky you! It''s raining here.', '${toDateTime('2023-09-23T02:10:00.000Z')}', '1', '1'),
  ('message-15', '@chat_dummy01', '@id_dummy03', 'Rainy days can be cozy too!', '${toDateTime('2023-09-23T02:15:00.000Z')}', '1', '1'),
  ('message-16', '@chat_dummy01', '@id_dummy01', 'True, I do enjoy some hot tea on rainy days.', '${toDateTime('2023-09-23T02:20:00.000Z')}', '1', '1'),
  ('message-17', '@chat_dummy01', '@id_dummy03', 'That sounds lovely. What kind of tea do you prefer?', '${toDateTime('2023-09-23T02:25:00.000Z')}', '1', '1'),
  ('message-18', '@chat_dummy01', '@id_dummy01', 'I love chamomile tea. How about you?', '${toDateTime('2023-09-23T02:30:00.000Z')}', '1', '1'),
  ('message-19', '@chat_dummy01', '@id_dummy03', 'I enjoy green tea. It''s so refreshing!', '${toDateTime('2023-09-23T02:35:00.000Z')}', '1', '1'),
  ('message-20', '@chat_dummy01', '@id_dummy01', 'Green tea is a great choice. Do you have a favorite brand?', '${toDateTime('2023-09-23T02:40:00.000Z')}', '1', '1'),
  ('message-21', '@chat_dummy01', '@id_dummy03', 'I like organic brands. They feel healthier.', '${toDateTime('2023-09-23T02:45:00.000Z')}', '1', '1'),
  ('message-22', '@chat_dummy01', '@id_dummy01', 'That''s a good choice. It''s important to stay healthy!', '${toDateTime('2023-09-23T02:50:00.000Z')}', '1', '1'),
  ('message-23', '@chat_dummy01', '@id_dummy03', 'Absolutely! Regular exercise helps too.', '${toDateTime('2023-09-23T02:55:00.000Z')}', '1', '1'),
  ('message-24', '@chat_dummy01', '@id_dummy01', 'I try to hit the gym whenever I can.', '${toDateTime('2023-09-23T03:00:00.000Z')}', '1', '1'),
  ('message-25', '@chat_dummy01', '@id_dummy03', 'That''s a great way to stay in shape!', '${toDateTime('2023-09-23T03:05:00.000Z')}', '1', '1'),
  ('message-26', '@chat_dummy01', '@id_dummy01', 'Indeed, it keeps me energized too.', '${toDateTime('2023-09-23T03:10:00.000Z')}', '1', '1'),
  ('message-27', '@chat_dummy01', '@id_dummy03', 'I need to get back to my workout routine as well.', '${toDateTime('2023-09-23T03:15:00.000Z')}', '1', '1'),
  ('message-28', '@chat_dummy01', '@id_dummy01', 'You''ll feel great once you do!', '${toDateTime('2023-09-23T03:20:00.000Z')}', '1', '1'),
  ('message-29', '@chat_dummy01', '@id_dummy03', 'I hope so! Thanks for the motivation.', '${toDateTime('2023-09-23T03:25:00.000Z')}', '1', '1'),
  ('message-30', '@chat_dummy01', '@id_dummy01', 'You''re welcome! Keep me posted on your progress.', '${toDateTime('2023-09-23T03:30:00.000Z')}', '0', '0');
  `);
};

exports.down = function (db) {
  return db.runSql(`TRUNCATE TABLE messages;`);
};

exports._meta = {
  "version": 1
};
