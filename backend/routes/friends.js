const express = require('express')
const friendsController = require('../controllers/friends')

const router = express.Router()

router.post('/', friendsController.makeFriend)

router.get('/pendingrequests', friendsController.retrieveRequests)


module.exports = router