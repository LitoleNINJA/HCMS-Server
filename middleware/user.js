const jwt = require('jsonwebtoken');
require('dotenv').config();

const user = (req, res, next) => {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    token = token.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = user;