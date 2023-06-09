const express = require('express')
const usersController = require('../controllers/users')
const chatController = require('../controllers/chats')

const router = express.Router()

router.post('/login',
    usersController.checkUser
)

router.post('/registration', usersController.addUser)

router.get('/all', usersController.retrieveAll)

router.post('/chat', chatController.retrieveChats)

router.get('/chat/messages', chatController.retrieveMessages)

router.post('/chat/newmessage', chatController.addMessage)

router.post('/chat/newchat', chatController.addChat)


module.exports = router