const Chat = require('../models/chat')
const Message = require('../models/message')

module.exports ={
    retrieveChats:(req,res) => {
        Chat.find({})
            .then(obj => res.json(obj))

    },

    retrieveMessages:(req, res)=>{
        Message.find({})
            .then(obj => res.json(obj))

    },

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
    }
}

