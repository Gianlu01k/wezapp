const mongoose = require('mongoose')


const chatSchema = mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
})

module.exports = mongoose.model("Chat", chatSchema)