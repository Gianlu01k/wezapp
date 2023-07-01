const express = require('express')
const usersController = require('../controllers/users')
const chatController = require('../controllers/chats')
const friendsRouter = require('./friends')

const router = express.Router()
const middleauth = require('./middleauth')

router.post('/login',usersController.checkUser)

//routes per la gestione delle chats e messaggi

router.post('/registration', usersController.addUser)

router.get('/all',middleauth, usersController.retrieveAll)

router.post('/one',middleauth, usersController.retrieveOne)

router.post('/chat',middleauth, chatController.retrieveChats)

router.get('/chat/messages',middleauth, chatController.retrieveMessages)

router.post('/chat/newmessage',middleauth, chatController.addMessage)

router.post('/chat/newchat',middleauth, chatController.addChat)

router.use('/friends',middleauth, friendsRouter)

module.exports = router