const jwt = require('jsonwebtoken');
const secretKey = 'wezappsk2023';

const decodeTokenMiddleware = (req, res, next) => {

    const token = req.headers.authorization;

    if (token) {

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {

                console.log('Errore nella verifica del token:', err.message);
                res.sendStatus(401);
            } else {

                req.user = decoded;
                next();
            }
        });
    } else {

        res.sendStatus(401);
    }
};

module.exports = decodeTokenMiddleware;
