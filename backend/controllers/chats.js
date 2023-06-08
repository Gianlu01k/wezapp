const Chat = require('../models/chat')
const Message = require('../models/message')

module.exports ={
    retrieveChats:(req,res) => {
        Chat.find({})
            .then(obj => res.json(obj))

    },

    retrieveMessages:(req, res)=>{
        Message.find({chat: req.body.idselected})
            .then(obj => res.json(obj))

    }
}

/* data.forEach((chat) => {
                if((chat.users[0] === req.body._id1 || chat.users[1] === req.body._id2)||(chat.users[1] === req.body._id1 || chat.users[0] === req.body._id2)){
                  */