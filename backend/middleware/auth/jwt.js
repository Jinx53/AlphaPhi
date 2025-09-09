const jwt = require('jsonwebtoken');
require('dotenv/config');
const JWTsecrect = process.env.jwtSecret;

function auth(req, res, next) {
    const token = req.header('alphaphi-auth-token');
    if (!token) return res.status(401).json({message: "No token provided, authorization denied"});

    try {
        const decoded = jwt.verify(token, JWTsecrect);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("token error", err)
        res.status(400).json({message: 'Token is invalid/expired'});
    }
    
}

module.exports = auth;