const express = require('express')
const friendsController = require('../controllers/friends')

const router = express.Router()

router.post('/', friendsController.makeFriend)

router.get('/pendingrequests', friendsController.retrieveRequests)

router.post('/accept', friendsController.acceptRequest)

router.post('/one', friendsController.retrieveOne)


module.exports = router