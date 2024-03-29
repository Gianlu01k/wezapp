const User = require('../models/users')
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {

    //controller gestione autenticazione con username e password
    checkUser:(req, res)=>{
       User.findOne({username: req.body.username})
            .then(async obj => {

                if (obj !== null && await bcrypt.compare( req.body.password, obj.password)){
                const payload = {
                        userId: obj._id,
                        username: obj.username
                    };
                const secretKey = 'wezappsk2023';
                const expiresIn = '2h';
                const token = jwt.sign(payload, secretKey, { expiresIn });
                console.log(token)
                    res.send({user: obj, verified: true, token: token})}
                else
                    res.send({verified: false})
            })
            .catch(err =>  console.log("errore nella ricerca sul db"))
},

    //controller per aggiunta di un utente in fase di registrazione
    addUser: (req, res) => {
        User.findOne({ username: req.body.username })
            .then(async obj => {
                if (obj === null) {
                    let encryptedPassword = await bcrypt.hash(req.body.password, 10);
                    User.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        password: encryptedPassword
                    })
                        .then(r => {

                            const payload = {
                                userId: r._id,
                                username: r.username
                            };
                            const secretKey = 'wezappsk2023';
                            const expiresIn = '2h';
                            const token = jwt.sign(payload, secretKey, { expiresIn });
                            r.token = token;
                            res.json({r, verified: true});
                        })
                        .catch(err => {
                            console.log("Errore nella creazione dell'utente", err);
                            res.sendStatus(500);
                        });
                } else {
                    res.send({verified: false});
                }
            })
            .catch(err => {
                console.log("Errore nella ricerca dell'utente", err);
                res.sendStatus(500);
            });
    },

    //controller per recuperare tutti gli utenti
    retrieveAll: (req, res) => {
        User.find({})
            .then(obj => res.json(obj))
            .catch(err=> {console.log("Errore nel recupero degli utenti", err);
        res.sendStatus(500);} )
    },

    //controller per recuperare un utente
    retrieveOne:(req, res) => {
        User.findOne({_id: req.body.id})
            .then(obj => res.json(obj))
            .catch(err=> {console.log("Errore nel recupero dell' utente", err);
                res.sendStatus(500);} )
    }

}