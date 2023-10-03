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

    socket.on("send-message", (data, callback) => {
      console.log("[ON: send-message] data:", data)

      if (connectedUsers.hasOwnProperty(data.recepient)) {
        const targetSocketId = connectedUsers[data.recepient]

        socket.to(targetSocketId).emit("receive-message", {
          // socket.emit("receive-message", {
          content: data.content,
          sender: data.sender,
          time: data.time
        })
        callback({ status: true })
      } else {
        callback({ status: false })
      }
    })
  })
}


