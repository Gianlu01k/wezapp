const mongoose = require('mongoose')

const friendsSchema = mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    req1: Boolean,
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    req2: Boolean,
})

module.exports = mongoose.model("Friend", friendsSchema)