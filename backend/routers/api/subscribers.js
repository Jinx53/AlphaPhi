const express = require('express');
const router = express.Router();
const Subscribers = require('../../models/Subscribers');
const authtoken = require('../../middleware/auth/jwt');

router.get('/', async (req, res) => {
    try{
        const subscriber = await Subscribers.find().sort({$natural: -1});
        res.json(subscriber);
    }catch (err){
        res.status(404).json({message: err});
    }
});

router.post('/', async (req, res) => {
    const {subscriber} = { ...req.body};
    if (!subscriber) return res.status(400).json({message: "An email must be provided"});
    const exist = await Subscribers.findOne({email: subscriber});
    if (exist) return res.status(400).json({message: "You have already subscribed"});
    const newSubscribers = new Subscribers({email: subscriber});
    try{
        const savedSubscribers = await newSubscribers.save();
        res.json(savedSubscribers);
    }catch (err){
        res.status(404).json({message: err});
    }
});

router.put('/:_id', authtoken, async (req, res) => {
    const _id = req.params._id;
    let subscriber = { ...req.body, $update_at: new Date()};
    try{
        const updatedSubscribers = await Subscribers.updateOne({_id},{ $set: { ...subscriber}});
        res.json({success: true});
    }catch (err) {
        console.error(`error: ${err}\nthe id: ${err.value} was not found`);
        res.status(404).json({message: err});
    }
});

router.delete('/:_id', authtoken,  async (req, res) =>{
    try{
        const deleteSubscribers = await Subscribers.deleteOne({_id: req.params._id});
        res.json({success: true});
    }catch (err){
        res.status(404).json({message: err, success: false});
    }
});


module.exports = router;