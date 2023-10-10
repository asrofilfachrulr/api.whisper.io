const pool = require('../config/dbConfig');

module.exports = (http) => {
  const io = require("socket.io")(http, {
    cors: "*"
  })

  const connectedUsers = {}

  io.on("connection", (socket) => {

    socket.on("disconnect", () => {
      console.log(`[ON: disconnect] user with socket id: ${socket.id} disconnected`)

      for (let userId in connectedUsers) {
        if (connectedUsers[userId] === socket.id) {
          console.log(`[ON: disconnect] deleting disconnected user ${userId} from map object`)
          delete connectedUsers[userId]
          console.log("[ON: disconnect] update connectedUsers: ", connectedUsers)
          return
        }
      }
    })

    socket.on("register-id", (userId) => {
      console.log(`[ON: userId] user ${userId} joined`)
      connectedUsers[userId] = socket.id

      console.log("[ON: register-id] update connectedUsers: ", connectedUsers)
    })

    socket.on("send-message", async (data, callback) => {
      console.log("[ON: send-message] data:", data)

      const {messageId, chatId, sender, recepient, content, time } = data
      const datetimeAdapter = (d) => d.slice(0, 19).replace('T', ' ')
      
      try {
        const [result, _] = await pool.query("INSERT INTO messages VALUES(?, ?, ?, ?, ?, ?, ?)", [messageId, chatId, sender, content, datetimeAdapter(time), true, true])
        if(result.affectedRows === 0) {
          throw "Server error: failed to creating new message"
        } 
      } catch (e) {
        console.log(e)
        callback({status: false, message: e})
        return
      }
      
      callback({ status: true })
      
      if (connectedUsers.hasOwnProperty(recepient)) {
        const targetSocketId = connectedUsers[recepient]

        socket.to(targetSocketId).emit("receive-message", {
          content,
          sender,
          time,
          messageId,
          chatId
        })
      }
    })
  })
}


