const User = require('../models/users')

module.exports = {
    checkUser:(req, res)=>{
       User.findOne({username: req.body.username, password:req.body.password})
            .then(obj => {
                if(obj !== null)
                    res.send({user: obj,verified: true})
                else
                    res.send({verified: false})
            })
            .catch(err =>  console.log("errore nella ricerca sul db"))
},

    addUser: (req, res) => {
        User.findOne({ username: req.body.username })
            .then(obj => {
                if (obj === null) {
                    User.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        password: req.body.password
                    })
                        .then(r => {
                            res.json({r, verified:true});
                        })
                        .catch(err => {
                            console.log("Errore nella creazione dell'utente", err);
                            res.sendStatus(500);
                        });
                } else {
                    res.send({ verified: false });
                }
            })
            .catch(err => {
                console.log("Errore nella ricerca dell'utente", err);
                res.sendStatus(500);
            });
    },

    retrieveAll: (req, res) => {
        User.find({})
            .then(obj => res.json(obj))
            .catch(err=> {console.log("Errore nel recupero degli utenti", err);
        res.sendStatus(500);} )
    },

    retrieveOne:(req, res) => {
        User.findOne({_id: req.body.id})
            .then(obj => res.json(obj))
            .catch(err=> {console.log("Errore nel recupero dell' utente", err);
                res.sendStatus(500);} )
    }

}