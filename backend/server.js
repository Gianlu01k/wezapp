const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
mongoose.connect("mongodb+srv://wezapp:progetto@wezappchat.p1ixspt.mongodb.net/chatdata")

const db = mongoose.connection
db.once("open", () => {
    console.log("Connesso al DB")
})

const router = require('./routes/chats')

app.use(cors())

app.use(express.json())

app.use(express.static("static"))

app.use('/', router)
//gestione per il decode del token
const decodeTokenMiddleware = require("./routes/middleauth");
app.get('http://localhost:3001/homepage', decodeTokenMiddleware, (req, res) => {
    res.status(200);
});


app.listen(3000, () => {
    console.log("App in ascolto")
})