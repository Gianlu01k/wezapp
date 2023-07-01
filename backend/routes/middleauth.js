const jwt = require('jsonwebtoken');
const secretKey = 'wezappsk2023';

const decodeTokenMiddleware = (req, res, next) => {

    //gestione token di sessione
    
    const token = req.headers.authorization;
    if (token) {
        const secretKey = 'wezappsk2023';
        jwt.verify(token,  secretKey, (err, decoded) => {
            if (err) {
                //invio messaggio di errore da parte del server
                res.sendStatus(401);
            } else {
                //autenticazione confermata
                req.user = decoded;
                next();
            }
        });
    } else {
        //invio messaggio di errore da parte del server
        res.sendStatus(401);
    }
};

module.exports = decodeTokenMiddleware;
