const express = require('express')
const usersController = require('../controllers/users')
const chatController = require('../controllers/chats')
const friendsRouter = require('./friends')

const router = express.Router()

router.post('/login',
    usersController.checkUser
)

router.post('/registration', usersController.addUser)

router.get('/all', usersController.retrieveAll)

router.post('/one', usersController.retrieveOne)

router.post('/chat', chatController.retrieveChats)

router.get('/chat/messages', chatController.retrieveMessages)

router.post('/chat/newmessage', chatController.addMessage)

router.post('/chat/newchat', chatController.addChat)

router.use('/friends', friendsRouter)

module.exports = router