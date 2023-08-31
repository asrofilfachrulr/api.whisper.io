require("dotenv").config()

const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {nanoid} = require("nanoid")
const pool = require("./config/dbConfig")

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/register", async (req, res) => {
  const id = `user-${nanoid()}`

  const {username, password, full_name} = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await pool.query(`INSERT INTO users VALUES (?, ?, ?, ?)`, [id, username, full_name, hashedPassword])
    res.status(201);
    res.json({ message: "user created" });
  } catch (error) {
    res.status(500).json({message: error})
  }
});

app.post("/login", async (req, res) => {
  const {username, password} = req.body
  
  try {
    const [rows, _] = await pool.query('SELECT id, password FROM users WHERE username = ?', [username])
    if(rows.length > 0){
      const row = rows[0]
      if(await bcrypt.compare(password, row.password)){
        const token = await jwt.sign({
          userId: row.id
        }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({message: 'login success', token})
      } else {
        res.status(401).json({message: 'invalid credentials'})
      }
    } else {
      res.status(404).json({message: 'user not found'})
    }
  } catch (error) {
    res.status(500).json({error})
  }
});


app.listen(8080, () => {
  console.log(`Server is listening...`);
});