const respErr = require("../responses/error")

function getContacts(pool){
  return async(req, res) => {
    const userId = req.user.userId
    try {
      const [rows, _] = await pool.query(`
      SELECT u1.username AS username, u1.full_name as full_name, f.user_id_2 as id
      FROM friends f
      INNER JOIN users u1 ON f.user_id_2 = u1.id
      WHERE f.user_id_1 = ?
      UNION
      SELECT u2.username AS username, u2.full_name as full_name, f.user_id_1 as id
      FROM friends f
      INNER JOIN users u2 ON f.user_id_1 = u2.id
      WHERE f.user_id_2 = ?;
      `, [userId, userId])
      if(rows.length > 0) {
        res.json({
            contacts: rows
        })
      } else {
        res.json({
          contacts: []
        })
      }
    } catch(e) {
      res
      .status(500)
      .json(respErr.ServerError(error))
    }
  }
}

function deleteContact(pool){
  return async(req, res) => {
    const targetId = req.body.userId
    const {userId} = req.user

    try {
      const [result, _] = await pool.query("DELETE FROM friends WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)", [userId, targetId, targetId, userId])
      
      if(result.affectedRows == 0){
        res.status(404)
          .json({message: "contact not found!"})
      } else {
        res.status(200)
          .json({message: "contact deleted"})
      }
    } catch(e){
      res.status(500)
        .json(respErr.ServerError(error))
    }
  }
}

function postNewContact(pool){
  return async(req, res) => {
    const targetId = req.body.userId
    const {userId} = req.user

    try {
      const [rows,_] = await pool.query("SELECT * from friends WHERE (`user_id_1` = ? AND `user_id_2` = ?) OR (`user_id_1` = ? AND `user_id_2` = ?)", [userId, targetId, targetId, userId])
      if(rows.length > 0){
        res.status(400)
        .json({message: "relationship already exist"})
      } else {
        const [result, _] = await pool.query("INSERT INTO friends (`user_id_1`, `user_id_2`) VALUES(?, ?)", [userId, targetId])
        if(result.affectedRows == 0){
          res.status(400)
            .json({message: "failed to add contact"})
        } else {
          res.status(201)
            .json({message: "contact added"})
        }
      }
    } catch(e){
      res.status(500)
        .json(respErr.ServerError(e))
    }
  }
}

module.exports = {
  getContacts,
  deleteContact,
  postNewContact
}