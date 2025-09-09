const express = require('express');
const router = express.Router();
const AboutUs = require('../../models/AboutUs');
const authtoken = require('../../middleware/auth/jwt');

function getAbout(router, req, res){
    return router.get('/', async (req, res) => {
        try{
            const aboutus = await AboutUs.find().sort({$natural: -1});
            return res.json(aboutus);
        }catch (err){
            return res.json({message: err});
        }
    });
}

router.get('/', async (req, res) => {
    try{
        const aboutus = await AboutUs.find().sort({$natural: -1});
        res.json(aboutus);
    }catch (err){
        res.json({message: err});
    }
});

router.post('/', authtoken, async (req, res) => {
    const {title, body} = { ...req.body};
    if (!title && !body) return res.status(400).json({message: "One field must be provided"});
    
    const newAboutUs = new AboutUs({ title, body  });
    try{
        const savedAboutUs = await newAboutUs.save();
        res.json(savedAboutUs);
    }catch (err){
        res.json({message: err});
    }
});

router.put('/:_id', authtoken, async (req, res) => {
    const _id = req.params._id;
    let aboutus = { ...req.body, $update_at: new Date()}
    try{
        const updatedAboutUs = await AboutUs.replaceOne({_id},{ ...aboutus});
        res.json({success: true});
    }catch (err) {
        console.error(`error: ${err}\nthe id: ${err.value} was not found`);
        res.status(404).json({message: err});
    }
});

router.delete('/:_id', authtoken, async (req, res) =>{
    try{
        const deleteresource = await AboutUs.deleteOne({_id: req.params._id});
        res.json({success: true});
    }catch (err){
        res.status(404).json({message: err, success: false});
    }
});

module.exports = router;