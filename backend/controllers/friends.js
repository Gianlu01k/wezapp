const Friend = require('../models/friends')

module.exports ={

    //controller per creare una istanza di richiesta di amicizia
    makeFriend:(req, res) =>{
        Friend.create({
            user1: req.body.user1,
            req1: true,
            user2: req.body.user2,
            req2: false,
        }).then(obj => res.json(obj))
            .catch(()=> res.sendStatus(500))
    },

    //recupera tutte le richieste di amicizia
    retrieveRequests:(req, res)=>{
        Friend.find({})
            .then(obj => res.json(obj))
            .catch(()=> res.sendStatus(500))
    },

    //recupera una singola richiesta di amicizia dato l'id della richiesta
    retrieveOne:(req, res) => {
        Friend.find({_id: req.body.idfriend})
            .then(obj => res.json(obj))
            .catch(()=> res.sendStatus(500))
    },

    //controller per accettare la richiesta dell'amico
    acceptRequest:(req, res)=>{
        Friend.updateOne({_id: req.body.idfriend}, {$set: { req2: true } })
            .then(obj => res.json(obj))
    },

    //controller per cancellare l'amicizia
    deleteOne:(req, res)=>{
        Friend.deleteOne({_id: req.body.idfriend})
            .then(obj => res.json(obj))}
}