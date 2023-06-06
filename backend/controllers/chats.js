const User = require('../models/users')

module.exports = {
    checkUser:(req, res)=>{
        User.findOne({username: req.params.username1})
            .then(u => res.json(u))
            .catch(alert("Utente inesistente"))
}
}