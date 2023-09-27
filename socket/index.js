module.exports = (http) => {
  const io = require("socket.io")(http, {
    cors: "*"
  })
  io.on("connection", (socket) => {
    console.log("[ON: connection] user connected")
    socket.on("disconnect", () => {
      console.log("[ON: disconnect] user disconnect")
    })

    socket.on("userId", (id) => {
      console.log(`[ON: userId] user ${id} joined`)
    })

    socket.on("send-message", (data, callback) => {
      console.log("[ON: send-message] data:", data)
      
      // simulate loading on sending message before reply ack
      setTimeout(()=> {
        callback({status: true})
        io.emit('receive-message', data)
      }, 2000)
    })
  })
}


