const Chat = require('../models/chat')
const Messages = require('../models/message')

module.exports ={
    retrieveChats:(req,res) => {
        Chat.find({})
            .then(obj =>  { const idchat=obj._id;
                    Messages.find({chat: idchat})
                        .then(data => res.json(data))
                        .then(messages => console.log(messages))
                }
            )
    }
}

/* data.forEach((chat) => {
                if((chat.users[0] === req.body._id1 || chat.users[1] === req.body._id2)||(chat.users[1] === req.body._id1 || chat.users[0] === req.body._id2)){
                  */