const Friend = require('../models/friends')

module.exports ={
    makeFriend:(req, res) =>{
        Friend.create({
            user1: req.body.user1,
            req1: true,
            user2: req.body.user2,
            req2: false,
        }).then(obj => res.json(obj))
            .catch(()=> res.sendStatus(500))
    },

    retrieveRequests:(req, res)=>{
        Friend.find({})
            .then(obj => res.json(obj))
            .catch(()=> res.sendStatus(500))
    },

    retrieveOne:(req, res) => {
        Friend.find({_id: req.body.idfriend})
            .then(obj => res.json(obj))
            .catch(()=> res.sendStatus(500))
    },

    acceptRequest:(req, res)=>{
        Friend.updateOne({_id: req.body.idfriend}, {$set: { req2: true } })
            .then(obj => res.json(obj))
    }
}