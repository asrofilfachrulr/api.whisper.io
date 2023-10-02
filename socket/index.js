module.exports = (http) => {
  const io = require("socket.io")(http, {
    cors: "*"
  })

  const connectedUsers = {}

  io.on("connection", (socket) => {
    console.log("[ON: connection] user connected")

    socket.on("disconnect", () => {
      console.log("[ON: disconnect] user disconnect")
    })

    socket.on("register-id", (userId) => {
      console.log(`[ON: userId] user ${userId} joined`)
      if (!connectedUsers.hasOwnProperty(userId))
        connectedUsers[userId] = socket.id

      console.log("update connectedUsers: ", connectedUsers)
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


