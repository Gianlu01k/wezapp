const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
})

module.exports = mongoose.model("User", userSchema)