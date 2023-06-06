const express = require('express')
const chatsController = require('../controllers/chats')

const router = express.Router()

router.get(':username', chatsController.checkUser)

module.exports = router