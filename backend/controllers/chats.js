const User = require('../models/users')

module.exports = {
    checkUser:(req, res)=>{
       User.findOne({username: req.body.username})
            .then(obj => {
                if(obj !== null)
                    res.send({user: obj,verified: true})
                else
                    res.send({verified: false})
            })
            .catch(err =>  console.log("errore nella ricerca sul db"))
}
}