require("dotenv").config()

const express = require("express");
const app = express();

const router = require('./routes')

const cors = require("cors")

app.use(cors())

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(router)

const port = process.env.PORT | 8080;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});