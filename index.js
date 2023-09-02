require("dotenv").config()

const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {nanoid} = require("nanoid")
const pool = require("./config/dbConfig")
const cors = require("cors")


const app = express();

app.use(cors())

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/register", async (req, res) => {
  const id = `user-${nanoid()}`

  const {email, password, full_name} = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await pool.query(`INSERT INTO users VALUES (?, ?, ?, ?)`, [id, email, full_name, hashedPassword])
    res.status(201);
    res.json({ message: "user created" });
  } catch (error) {
    res.status(500).json({message: error})
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body)
  const {email, password} = req.body
  
  try {
    const [rows, _] = await pool.query('SELECT id, password FROM users WHERE email = ?', [email])
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
      res.status(401).json({message: 'user not found'})
    }
  } catch (error) {
    res.status(500).json({error})
  }
});

// protected routes
const jwtMiddleware = require('./tokenize')

app.get("/user", jwtMiddleware, async (req, res) => {
  try {
    const [rows, _] = await pool.query('SELECT id, email, full_name FROM users WHERE id = ?', [req.user.userId])
    if(rows.length > 0) {
      const row = rows[0]
      res.json({user: {
        userId: row.id,
        email: row.email,
        fullName: row.full_name,
      }})
    } else {
      res.status(500).json({message: 'user not found!'})
    }
  } catch (error) {
    res.status(500).json({error})
  }
})

app.listen(8080, () => {
  console.log(`Server is listening...`);
});