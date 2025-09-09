const express = require('express');
const router = express.Router();
const cpanel_email = process.env.cpanel_email;
const test_email = process.env.user;
const {cpanelMailer} = require("../../middleware/mailer");

router.post('/', async (req, res) => {
   
    const pattern = "^\\+(?:[0-9] ?){6,14}[0-9]$|^\\d{10,13}$";
    const emailpattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    const { email, message, subject} = { ...req.body};
    const checkPattern = (pattern, value) => new RegExp(pattern).test(value)
    const validEmail = checkPattern(emailpattern, email);
    const validtext = message.trim().length;
    if (!validEmail || !validtext ) return res.status(400).json({message: "A mandatory field is not filled"});
    let emails = [test_email];

    try{
        const mailOptions = {
            from: cpanel_email,
            to: emails.join(", "),
            subject: `${subject}`,
            text: `Contact email: ${email}\n\n ${message}`,
        }

        const info = await cpanelMailer(mailOptions); 
        res.json({success: true});

    } catch (err){
        console.error("the error", err);
        res.json({message: err});
    }
});



module.exports = router;