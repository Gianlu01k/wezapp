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


module.exports = router