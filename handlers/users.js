const {nanoid} = require("nanoid")
const bcrypt = require("bcrypt")

const respErr = require("../responses/error")

function getUserHandler(pool) {
  return async (req, res) => {
    try {
      const [rows, _] = await pool.query(`SELECT users.id , users.username, users.full_name, 
      users.country, users.gender, users.birth_year, users.bio,credentials.email 
      FROM users JOIN credentials ON users.id = credentials.user_id WHERE users.id = ?`, [req.user.userId])
      if(rows.length > 0) {
        const row = rows[0]
        res.json({user: row})
      } else {
        res.status(404).json({message: 'user not found!'})
      }
    } catch (error) {
      res
      .status(500)
      .json(respErr.ServerError(error))
    }
  }
}

function getPublicUserHandler(pool) {
  return async (req, res) => {
    try {
      const [rows, _] = await pool.query(`SELECT users.username, users.full_name, 
      users.country, users.gender, users.birth_year, users.bio
      FROM users WHERE users.id = ?`, [req.params.id])
      if(rows.length > 0) {
        const row = rows[0]
        res.json({user: row})
      } else {
        res.status(404).json({message: 'user not found!'})
      }
    } catch (error) {
      res
      .status(500)
      .json(respErr.ServerError(error))
    }
  }
}

function postNewUserHandler(pool) {
  return async (req, res) => {
    const id = `@id_user${nanoid()}`

    const {username, email, password, full_name} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      await pool.query('INSERT INTO users (`id`, `username`, `full_name`) VALUES (?, ?, ?)', [id, username, full_name])
      try {
        await pool.query(`INSERT INTO credentials VALUES (?, ?, ?)`, [id, email, hashedPassword])
      } catch (error) {
        throw "Error adding credential";
      }
      res.status(201);
      res.json({ message: "user created" });
    } catch (error) {
      await pool.query('DELETE FROM users WHERE id = ?', [id])
      res
      .status(500)
      .json(respErr.ServerError(error))
    }
  }
}

module.exports = {
  postNewUserHandler,
  getUserHandler,
  getPublicUserHandler
}