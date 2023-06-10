const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
})

module.exports = mongoose.model("User", userSchema)