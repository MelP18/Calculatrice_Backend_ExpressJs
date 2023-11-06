const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Accès refusé !' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { noTimestamp: true },(err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Jetons d\'accès invalide.' });
        }
        req.user = user;
        next();   
    });
}


module.exports = authenticateToken