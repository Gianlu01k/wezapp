const Chat = require('../models/chat')
const Message = require('../models/message')

module.exports ={
    //controller per recuperare tutte le chat
    retrieveChats:(req,res) => {
        Chat.find({})
            .then(obj => res.json(obj))

    },

    //controller per recuperare tutti i messaggi
    retrieveMessages:(req, res)=>{
        Message.find({})
            .then(obj => res.json(obj))

    },

    //controller per aggiungere un messaggio dati mittente, contenuto e chat id
    addMessage:(req, res) => {
        Message.create(
            {
                mittente: req.body.mittente,
                content: req.body.content,
                chat: req.body.chat
            }
        ).catch(err => {
            console.log("Errore nell'invio del messaggio", err);
            res.sendStatus(500);
        });
    },

    //controller per creazione nuova chat tra utenti
    addChat:(req,res)=>{
        Chat.create({
            users: req.body.users
        }).then(obj => res.json(obj))
            .catch(err => {
            console.log("Errore nella creazione della chat", err);
            res.sendStatus(500);
        });
    }
}

