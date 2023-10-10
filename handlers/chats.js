const {nanoid} = require("nanoid")
const respErr = require("../responses/error")

function getChats(pool){
  return async(req, res) => {
    const {userId }= req.user
    try {
      const [rows, _] = await pool.query(`
      SELECT * FROM chats WHERE participant_1 = ? OR participant_2 = ?;
      `, [userId, userId])
      if(rows.length > 0) {
        const chats = rows.map(row => ({
          id: row.id,
          participants: [row.participant_1, row.participant_2],
          messages: []
        }))
        res.json({
            chats
        })
      } else {
        res.json({
          chats: []
        })
      }
    } catch(e) {
      res
      .status(500)
      .json(respErr.ServerError(error))
    }
  }
}

function deleteChat(pool){
  return async(req, res) => {
    const {chatId} = req.body
    const {userId} = req.user

    try {
      const [result, _] = await pool.query("DELETE FROM chats WHERE (id = ? AND participant_1 = ?) OR (id = ? AND participant_2 = ?)", [chatId, userId, chatId, userId])
      
      if(result.affectedRows == 0){
        res.status(404)
          .json({message: "chat not found!"})
      } else {
        res.status(200)
        .json({message: "chat deleted"})
      }
    } catch(e){
      res.status(500)
        .json(respErr.ServerError(error))
    }
  }
}

function postNewChat(pool){
  return async(req, res) => {
    const {participantId} = req.body
    const {userId} = req.user
    const chatId = `@chat-${nanoid()}`

    try {
      const [rows, _] = await pool.query(`
      SELECT * FROM chats WHERE (participant_1 = ? AND participant_2 = ?) OR (participant_1 = ? AND participant_2 = ?);
      `, [userId, participantId, participantId, userId])
      if(rows.length > 0) {
        res.status(400).json({
            message: 'chat wtih such participants already exist'
        })
      } else {
        const [result, _] = await pool.query("INSERT INTO chats VALUES(?, ?, ?)", [chatId, userId, participantId])
  
        if(result.affectedRows == 0){
          res.status(400)
            .json({message: "fail to create chat"})
        } else {
          res.status(201)
            .json({message: "chat created", chat: {
              id: chatId,
              participants: [userId, participantId],
              messages: [] 
            }})
        }   
      }
    } catch(e){
      res.status(500)
        .json(respErr.ServerError(e))
    }
  }
}

module.exports = {
  getChats,
  deleteChat,
  postNewChat
}