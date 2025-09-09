const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authtoken = require('../../middleware/auth/jwt');
const { cpanelMailer } = require("../../middleware/mailer");
require('dotenv/config');
const JWTsecrect = process.env.jwtSecret;
const cpanel_email = process.env.cpanel_email;
const test_email = process.env.user;

router.get('/', async (req, res) => {
    try{
        const allUsers = await User.find().select("-password").sort({$natural: -1});
        res.json(allUsers);
    }catch (err){
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    const {fname, lname, email, password, password2} = { ...req.body};
    if (!fname || !lname || !email || !password || !password2) return res.status(400).json({message: "All fields must be provided"});
    if ((!password || !password2) || password !== password2) return res.status(400).json({message: "Password must match"});

    User.findOne({email}).then((user) => {
        if (user) return res.status(400).json({message: "User already exist"});
        
        let newUser = new User({fname, lname, email, password});
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                if (err) throw `Bcrypt error: ${err}`;
                newUser.password = hash;
                newUser.save().then(user => {
                    res.json({
                        _id: user._id,
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email,
                    });
                });
            });
            if (err) throw `Bcrypt salt error: ${err}`;
        });
    });
    
});

router.post('/signup', async (req, res) => {
    const {fname, lname, email, password, password2} = { ...req.body};
    if (!fname || !lname || !email || !password || !password2) return res.status(400).json({message: "All fields must be provided"});
    if ((!password || !password2) || password !== password2) return res.status(400).json({message: "Password must match"});
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,}$/;
    const checkPattern = (pattern, value) => new RegExp(pattern).test(value);
    if (!checkPattern(passwordPattern, password)) return res.status(400).json({message: "The password does not meet the requirement of at least one lowercase letter, one uppercase letter, one digit, one special character, and is at least 8 characters long"});

    User.findOne({email}).then((user) => {
        if (user) return res.status(400).json({message: "User already exist"});
        
        let newUser = new User({fname, lname, email, password});
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                if (err) throw `Bcrypt error: ${err}`;
                newUser.password = hash;
                newUser.save().then(user => {
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
                });
            });
            if (err) throw `Bcrypt salt error: ${err}`;
        });
    });
    
});

// @desc get user
router.get('/:userId', authtoken, async (req, res) =>{
    try{
        const specificUser = await User.findById(req.params.userId);
        res.json(specificUser);
    }catch (err){
        res.json({message: err});
    }

});

// @route delete/user
// @desc delete user
// @access Public
router.delete('/:userId', authtoken, async (req, res) =>{
    try{
        const deletedUser = await User.deleteOne({_id: req.params.userId});
        res.json({success: true});
    }catch (err){
        res.status(404).json({message: `delete error: ${err}`, success: false});
    }
});


// @route patch/user
// @desc update user info
// @access Public
router.patch('/:userId', authtoken, async (req, res) => {
    //console.log('patch request: ', req.body);
    try{
        const updateUser = await User.updateOne(
            {_id: req.params.userId},
            [
                {
                    $set: {email: req.body.email, updated_at: "$$NOW"},
                }
            ]
            );
        res.json({success: true});
    }catch (err) {
        console.error(`error: ${err}\nthe id was not found`);
        res.status(404).json({message: err});
    }
});

// @route put/user
// @desc update user
// @access Public

router.put('/:userId', authtoken, async (req, res) => {
    const _id = req.params.userId; 
    const email = req.body.email || ""; 
    if (!email.trim().length) return res.status(400).json({message: "An email must be provided"});
    const user = await User.findOne({email});
    if (user) return res.status(400).json({message: "A user with this email already exisit"});
    
    try{
        const updatedUser = await User.updateOne(
            {_id},
            {
                $set: {email, updated_at: Date.now()},
            }
            );
        res.json({success: true});
    }catch (err) {
        console.error(`error: ${err}\nthe id: ${err.value} was not found`);
        res.status(404).json({message: err});
    }
});

router.post('/passwordchange', authtoken, async (req, res) => {
    const {email, currentpassword, newpassword, password2} = { ...req.body};
    if (!email || !currentpassword || !newpassword || !password2) return res.status(400).json({message: "All fields must be provided"});
    if (newpassword !== password2) return res.status(400).json({message: "The entires of the new password must match each other"});
    if (currentpassword === password2) return res.status(400).json({message: "You cannot use your existing password as the new password"});
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,}$/;
    const checkPattern = (pattern, value) => new RegExp(pattern).test(value);
    if (!checkPattern(passwordPattern, password)) return res.status(400).json({message: "The password does not meet the requirement of at least one lowercase letter, one uppercase letter, one digit, one special character, and is at least 8 characters long"});

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "The email or password provided is incorrect"});
        const passwordconfirmed = await bcrypt.compare(currentpassword, user.password);
        if(!passwordconfirmed) return res.status(400).json({message: 'Invalid credentials/ you can only change your password'});
        const getSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newpassword, getSalt);
        const success = await User.updateOne({email}, { $set: {password: hashedPassword, updated_at: Date.now()}})

        res.json({success: !!success.modifiedCount})
    } catch (error) {
        console.error(`error - password change: ${error}`);
        res.status(404).json({message: error});
    }
});

//TODO: Review and complete reset password if not completed
//add experation and a url to reset
router.post('/resetpassword', authtoken, async (req, res) => {
    const {_id} = { ...req.body};
    if (!_id) return res.status(400).json({message: "User not provided"});
    const tempPass = generateRandomPassword(12);
    try {
        const getSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(tempPass, getSalt);
        const user = await User.findOne({_id});
        if (!user) return res.status(400).json({message: "User does not exisit"});
        const success = await User.updateOne({_id}, { $set: {password: hashedPassword, updated_at: Date.now()}});
        const email = user.email;
        const mailOptions = {
            from: cpanel_email,
            to: [email, test_email].join(", "),
            subject: `Password Reset - ${email}`,
            text: `Hi ${user.lname} ${user.fname},\n\n Your temp password is: ${tempPass}`,
        }

        const info = await cpanelMailer(mailOptions); 
        console.log(info.response.includes('250 OK'))
        res.json({success: !!success.modifiedCount});
    } catch (error) {
        console.error(`error - resetpassword: ${error}`);
        res.status(404).json({message: error});
    }
  
});


function generateRandomPassword(length) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericChars = '0123456789';
    const specialChars = '!@#$%^&*()_-+=|[]{};:,.<>?';
  
    const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;
  
    let password = '';
  
    // Add at least one character from each character set
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += numericChars[Math.floor(Math.random() * numericChars.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
  
    // Add remaining characters
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
  
    // Shuffle the password characters
    password = password.split('').sort(() => Math.random() - 0.5).join('');
  
    return password;
}
 


module.exports = router;