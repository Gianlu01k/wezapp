const express = require('express')
const usersController = require('../controllers/users')

const router = express.Router()

router.post('/login',
    usersController.checkUser
)

router.post('/registration', usersController.addUser)

router.get('/all', usersController.retrieveAll)

module.exports = router