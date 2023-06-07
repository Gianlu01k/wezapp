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
                            res.sendStatus(500); // Invia un codice di stato di errore al client
                        });
                } else {
                    res.send({ verified: false }); // Invia la risposta al client
                }
            })
            .catch(err => {
                console.log("Errore nella ricerca dell'utente", err);
                res.sendStatus(500); // Invia un codice di stato di errore al client
            });
    }

}