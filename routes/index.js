const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig');

const jwtMiddleware = require('../tokenize')

const users = require('../handlers/users')
const auth = require('../handlers/auth')

/* 
*  to pass object to handler function that should be just a callback on router param,
*  create the handler itself a function that return function, so object can be passed
*/
router.post("/register", users.postNewUserHandler(pool))
router.post("/login", auth.postLoginHandler(pool))

router.get('/user/public/:id', users.getPublicUserHandler(pool))

// protected routes
router.get("/user", jwtMiddleware, users.getUserHandler(pool))

module.exports = router