const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const respErr = require("../responses/error")

function postLoginHandler(pool) {
  return async (req, res) => {
    const {identifier, password} = req.body
    try {
      const typeIndentifier = identifier.indexOf('@') === -1 ? 'u.username' : 'c.email'
      const prepQuery = `SELECT u.id, u.username, c.email, c.password FROM user_bio u JOIN credentials c ON u.id = c.user_id  WHERE ${typeIndentifier} = ?`
      const [rows, _] = await pool.query(prepQuery, [identifier])
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
      res.status(500).json(respErr.ServerError(error))
    }
  }
}

module.exports = {
  postLoginHandler
}