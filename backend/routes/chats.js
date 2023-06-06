const express = require('express')
const chatsController = require('../controllers/chats')

const router = express.Router()

router.post('/login',
    chatsController.checkUser
)

module.exports = router