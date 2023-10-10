const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig');

const jwtMiddleware = require('../tokenize')

const users = require('../handlers/users')
const auth = require('../handlers/auth')
const contacts = require('../handlers/contacts')
const chats = require('../handlers/chats')
const message = require("../handlers/messages")

/* 
*  to pass object to handler function that initially should be just a callback,
*  create the handler itself a function that return function, so object can be passed
*/
router.post("/register", users.postNewUserHandler(pool))
router.post("/login", auth.postLoginHandler(pool))

router.get('/user/public/:identifier', users.getPublicUserHandler(pool))

// protected routes
router.get("/user", jwtMiddleware, users.getUserHandler(pool))

router.get("/contacts", jwtMiddleware, contacts.getContacts(pool))
router.delete("/contact", jwtMiddleware, contacts.deleteContact(pool))
router.post("/contact", jwtMiddleware, contacts.postNewContact(pool))

router.get("/chats", jwtMiddleware, chats.getChats(pool))
router.delete("/chat", jwtMiddleware, chats.deleteChat(pool))
router.post("/chat", jwtMiddleware, chats.postNewChat(pool))

router.get("/messages", jwtMiddleware, message.getMessagesByChatId(pool))
router.put("/messages/read", jwtMiddleware, message.putIsRead(pool))
router.put("/messages/delivered", jwtMiddleware, message.putIsDelivered(pool))
router.post("/message", jwtMiddleware, message.postNewMessage(pool))

module.exports = router