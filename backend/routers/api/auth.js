const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv/config');
const JWTsecrect = process.env.jwtSecret;
const authtoken = require('../../middleware/auth/jwt');

router.post('/', async (req, res) => {
    const {email, password} = { ...req.body};
    if ( !email || !password ) return res.status(400).json({message: "All fields must be provided"});
    User.findOne({email}).then((user) => {
        if (!user) return res.status(400).json({message: "The email or password provided is incorrect"});
        
        bcrypt.compare(password, user?.password || "", function (err, found){
            if (err) throw `Login error: ${err}`;
            if(!found) return res.status(400).json({message: 'Invalid credentials'});
            jwt.sign(
                { id: user._id},
                JWTsecrect,
                { expiresIn: 3600},
                (err, token) => {
                    if (err) throw `token sign in err: ${err}`;
                    res.json({
                        token,
                        user: {
                            _id: user._id,
                            fname: user.fname,
                            lname: user.lname,
                            email: user.email
                        }
                    });
                }
            ); 
        })
    }); 
    
});


router.get('/user', authtoken, (req, res) => {
    User.findById(req.user.id).select('-password').then(user => res.json(user));
});


module.exports = router;