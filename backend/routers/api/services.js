const express = require('express');
const router = express.Router();
const Service = require('../../models/Service');
const upload = require('../../middleware/upload');
const authtoken = require('../../middleware/auth/jwt');


router.get('/', async (req, res) => {
    try{
        const service = await Service.find().sort({$natural: -1});
        res.json(service);
    }catch (err){
        res.json({message: err});
    }
});

router.post('/', authtoken, upload.single('photo'), async (req, res) => {
    const {title, body, footer} = { ...req.body};
    const photo = req?.file?.filename;
    if (!title && !body && !footer) return res.status(400).json({message: "One field must be provided"});
    const newService = new Service({title, body, photo, footer});
    try{
        const savedService = await newService.save();
        res.json(savedService);
    }catch (err){
        res.json({message: err});
    }
});

router.put('/:_id', authtoken, async (req, res) => {
    const _id = req.params._id;
    let service = { ...req.body, $update_at: new Date()}
    try{
        const updatedService = await Service.replaceOne({_id},{ ...service});
        res.json({success: true});
    }catch (err) {
        console.error(`error: ${err}\nthe id: ${err.value} was not found`);
        res.status(404).json({message: err});
    }
});

router.delete('/:_id', authtoken, async (req, res) =>{
    try{
        const deleteresource = await Service.deleteOne({_id: req.params._id});
        res.json({success: true});
    }catch (err){
        res.status(404).json({message: err, success: false});
    }
});


module.exports = router;