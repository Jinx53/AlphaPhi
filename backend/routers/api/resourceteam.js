const express = require('express');
const router = express.Router();
const ResourceTeam = require('../../models/ResourceTeam');
const upload = require('../../middleware/upload');
const authtoken = require('../../middleware/auth/jwt');

router.get('/', async (req, res) => {
    try{
        const resourceteam = await ResourceTeam.find().sort({$natural: -1});
        res.json(resourceteam);
    }catch (err){
        res.json({message: err});
    }
});

router.post('/', authtoken, upload.single('photo'), async (req, res) => {
    const {name, role, duty} = { ...req.body};
    const photo = req?.file?.filename;
    if (!name && !role && !duty) return res.status(400).json({message: "One field must be provided"});
    const newResourceTeam = new ResourceTeam({name, role, photo, duty});

    try{
        const savedResourceTeam = await newResourceTeam.save();
        res.json(savedResourceTeam);
    }catch (err){
        res.json({message: err});
    }
});

router.put('/:_id', authtoken,  upload.single('photo'), async (req, res) => {
    const _id = req.params._id;
    let resourceteam = { ...req.body, $update_at: new Date()};
    const photo = req?.file?.filename;
    resourceteam.photo = photo;
    try{
        const updatedResourceTeam = await ResourceTeam.updateOne({_id},{ $set: {...resourceteam}});
        res.json({success: true});
    }catch (err) {
        console.error(`error: ${err}\nthe id: ${err.value} was not found`);
        res.status(404).json({message: err});
    }
});

router.delete('/:_id', authtoken, async (req, res) =>{
    try{
        const deleteresource = await ResourceTeam.deleteOne({_id: req.params._id});
        res.json({success: true});
    }catch (err){
        res.status(404).json({message: err, success: false});
    }
});


module.exports = router;