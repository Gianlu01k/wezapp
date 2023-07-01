const express = require('express')
const friendsController = require('../controllers/friends')
const middleauth = require('./middleauth')

const router = express.Router()

//routes per la gestione delle amicizie

router.post('/',middleauth, friendsController.makeFriend)

router.get('/pendingrequests',middleauth, friendsController.retrieveRequests)

router.post('/accept',middleauth, friendsController.acceptRequest)

router.post('/one',middleauth, friendsController.retrieveOne)

router.post('/delete',middleauth, friendsController.deleteOne)


module.exports = router