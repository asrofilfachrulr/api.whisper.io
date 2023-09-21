module.exports = (http) => {
  const io = require("socket.io")(http, {
    cors: "*"
  })
  io.on("connection", (socket) => {
    console.log("user connected")
    socket.on("disconnect", () => {
      console.log("user disconnect")
    })

    socket.on("userId", (id) => {
      console.log(`user ${id} joined`)
    })
  })
}

