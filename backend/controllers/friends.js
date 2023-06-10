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
    }
}