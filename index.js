require("dotenv").config()

const express = require("express");
const app = express();
const http = require("http").createServer(app)
require("./socket")(http)

const cors = require("cors")
app.use(cors())

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
  );
  
const router = require('./routes')
app.use(router)

const port = process.env.PORT || 8080;

http.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});