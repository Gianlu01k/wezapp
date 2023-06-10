const express = require('express')
const friendsController = require('../controllers/friends')

const router = express.Router()

router.post('/', friendsController.makeFriend)

router.get('/pendingrequests', friendsController.retrieveRequests)

router.post('/accept', friendsController.acceptRequest)


module.exports = router