const {nanoid} = require("nanoid")
const respErr = require("../responses/error")

function getMessagesByChatId(pool){
  return async(req, res) => {
    const {userId} = req.user
    const {chatId} = req.body

    try {
      const [rows, _] = await pool.query('SELECT * FROM chats WHERE (id = ? AND participant_1 = ?) OR (id = ? AND participant_2 = ?)', [chatId, userId, chatId, userId])

      if(rows.length == 0) {
        res.status(403).json({message: 'you are not allowed to access this resource'})
      } else {
        const [rows, _] = await pool.query(`
        SELECT * FROM messages WHERE chat_id = ?;
        `, [chatId])
        if(rows.length > 0) {
          const messages = rows.map(message => ({...message, time: new Date(message.time)}))
          messages.sort((a, b) => a.time - b.time)
          res.json({
              messages
          })
        } else {
          res.json({
            messages: []
          })
        }
      }
    } catch(e) {
      res
      .status(500)
      .json(respErr.ServerError(error))
    }
  }
}


function postNewMessage(pool){
  return async(req, res) => {
    const {chatId, content, time} = req.body
    const {userId} = req.user
    const datetimeAdapter = (d) => d.slice(0, 19).replace('T', ' ')
    const messageId = `@message-${nanoid()}`

    try {
      const [rows, _] = await pool.query('SELECT * FROM chats WHERE (id = ? AND participant_1 = ?) OR (id = ? AND participant_2 = ?)', [chatId, userId, chatId, userId])

      if(rows.length == 0) {
        res.status(403).json({
            message: 'you are not allowed to access this resource'
        })
      } else {
        const [result, _] = await pool.query("INSERT INTO messages VALUES(?, ?, ?, ?, ?, ?, ?)", [messageId, chatId, userId, content, datetimeAdapter(time), false, false])
  
        if(result.affectedRows == 0){
          res.status(400)
            .json({message: "fail to push message"})
        } else {
          res.status(201)
            .json({message: "message pushed"})
        }   
      }
    } catch(e){
      res.status(500)
        .json(respErr.ServerError(e))
    }
  }
}

function putIsRead(pool){
  return async(req, res) => {
    const {chatId, messageIds} = req.body
    const {userId} = req.user

    try {
      const [rows, _] = await pool.query('SELECT * FROM chats WHERE (id = ? AND participant_1 = ?) OR (id = ? AND participant_2 = ?)', [chatId, userId, chatId, userId])

      if(rows.length == 0) {
        res.status(403).json({
            message: 'you are not allowed to access this resource'
        })
      } else {
        const [result, _] = await pool.query(`UPDATE messages SET isRead = 1 WHERE id IN (${messageIds.map(() => '?').join(", ")}) AND chat_id = ?`, [...messageIds, chatId])
  
        if(result.affectedRows == 0){
          res.status(400)
            .json({message: "fail to update message"})
        } else {
          res.status(201)
            .json({message: "message updated"})
        }   
      }
    } catch(e){
      console.log(e)
      res.status(500)
        .json(respErr.ServerError(e))
    }
  }
}

function putIsDelivered(pool){
  return async(req, res) => {
    const {chatId, messageIds} = req.body
    const {userId} = req.user

    try {
      const [rows, _] = await pool.query('SELECT * FROM chats WHERE (id = ? AND participant_1 = ?) OR (id = ? AND participant_2 = ?)', [chatId, userId, chatId, userId])

      if(rows.length == 0) {
        res.status(403).json({
            message: 'you are not allowed to access this resource'
        })
      } else {
        const [result, _] = await pool.query(`UPDATE messages SET isDelivered = 1 WHERE id IN (${messageIds.map(() => '?').join(", ")}) AND chat_id = ?`, [...messageIds, chatId])
  
        if(result.affectedRows == 0){
          res.status(400)
            .json({message: "fail to update message"})
        } else {
          res.status(201)
            .json({message: "message updated"})
        }   
      }
    } catch(e){
      console.log(e)
      res.status(500)
        .json(respErr.ServerError(e))
    }
  }
}


module.exports = {
  getMessagesByChatId,
  postNewMessage,
  putIsRead,
  putIsDelivered
}