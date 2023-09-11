const {nanoid} = require("nanoid")
const bcrypt = require("bcrypt")

const respErr = require("../responses/error")

function getUserHandler(pool) {
  return async (req, res) => {
    try {
      const [rows, _] = await pool.query(`SELECT user_bio.id , user_bio.username, user_bio.full_name, 
      user_bio.country, user_bio.gender, user_bio.birth_year, user_bio.bio,credentials.email 
      FROM user_bio JOIN credentials ON user_bio.id = credentials.user_id WHERE user_bio.id = ?`, [req.user.userId])
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
      const [rows, _] = await pool.query(`SELECT user_bio.username, user_bio.full_name, 
      user_bio.country, user_bio.gender, user_bio.birth_year, user_bio.bio
      FROM user_bio WHERE user_bio.id = ?`, [req.params.id])
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

    const {username, country, gender, birth_year, email, password, full_name} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      await pool.query(`INSERT INTO user_bio VALUES (?, ?, ?, ?, ?, ?, ?)`, [id, username, full_name, country, gender, birth_year, null])
      try {
        await pool.query(`INSERT INTO credentials VALUES (?, ?, ?)`, [id, email, hashedPassword])
      } catch (error) {
        throw "Error adding credential";
      }
      res.status(201);
      res.json({ message: "user created" });
    } catch (error) {
      await pool.query('DELETE FROM user_bio WHERE id = ?', [id])
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