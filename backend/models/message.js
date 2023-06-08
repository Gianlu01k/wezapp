const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    mittente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
})

module.exports = mongoose.model("Message", messageSchema)