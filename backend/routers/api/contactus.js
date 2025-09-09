const express = require('express');
const router = express.Router();
const ContactUs = require('../../models/ContactUs');
const {cpanelMailer} = require("../../middleware/mailer");
const authtoken = require('../../middleware/auth/jwt');
const cpanel_email = process.env.cpanel_email;
const test_email = process.env.user;


router.get('/', async (req, res) => {
    try{
        const contactus = await ContactUs.find().sort({$natural: -1});
        res.json(contactus);
    }catch (err){
        res.json({message: err});
    }
});

router.post('/', authtoken, async (req, res) => {
   
    const {body, address, phone, multitel, email} = { ...req.body};
    if (!body && !address && !phone && !multitel.length && !email) return res.status(400).json({message: "One field must be provided"});
    
    const newContactUs = new ContactUs({
        body,
        address,
        phone,
        multitel,
        email
    })

    try{
        const savedContactUs = await newContactUs.save();
        res.json(savedContactUs);
    }catch (err){
        console.error(`the error ${err}`);
        res.status(404).json({message: err});
    }
});

router.post('/mail', async (req, res) => {
   
    const pattern = "^\\+(?:[0-9] ?){6,14}[0-9]$|^\\d{10,13}$";
    const emailpattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    const { email, message, subject, name, startDate, selection, other, description} = { ...req.body};
    const checkPattern = (pattern, value) => new RegExp(pattern).test(value)
    const validEmail = checkPattern(emailpattern, email);
    const validtext = message.trim().length;
    if (!validEmail || !validtext ) return res.status(400).json({message: "A mandatory field is not filled"});
    let emails = [test_email];
    //if (validEmail && copyme) emails.push(email);

    try{
        let serviceText = `Name: ${name}\n\nState Date: ${startDate}\n\nSelection: ${selection}\n\nOther: ${other}`
        const mailOptions = {
            from: cpanel_email,
            to: emails.join(", "),
            subject: `${description} - ${subject}`,
            text: `${name.length ? serviceText : ""}\nContact email: ${email}\n\n ${message}`,
        }

        const info = await cpanelMailer(mailOptions); 

        res.json({success: true});

    } catch (err){
        console.error("the error", err);
        res.json({message: err});
    }
});

router.put('/:_id', authtoken, async (req, res) => {
    const _id = req.params._id;
    let contactus = { ...req.body, $update_at: Date}
    try{
        const updatedContactUs = await ContactUs.updateOne({_id},{ $set: { ...contactus}});
        res.json({success: true});
    }catch (err) {
        console.error(`error: ${err}\nthe id: ${err.value} was not found`);
        res.status(404).json({message: err});
    }
});

router.put('/setActive/:_id', authtoken, async (req, res) => {
    const _id = req.params._id;
    let contactus = { ...req.body, $update_at: Date}
    const {active} = contactus
    try{
        const updateOldContact = await ContactUs.updateOne({active},{ $set: { active: false}});

        const updatedContactUs = await ContactUs.updateOne({_id},{ $set: { ...contactus}});
        res.json({success: true});
    }catch (err) {
        console.error(`error: ${err}\nthe id: ${err.value} was not found`);
        res.status(404).json({message: err});
    }
});

router.delete('/:_id', authtoken, async (req, res) =>{
    try{
        const deleteresource = await ContactUs.deleteOne({_id: req.params._id});
        res.json({success: true});
    }catch (err){
        res.status(404).json({message: err, success: false});
    }
});


module.exports = router;