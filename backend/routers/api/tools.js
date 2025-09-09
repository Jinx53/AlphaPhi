const express = require('express');
const router = express.Router();
const Tool = require('../../models/Tool');
const upload = require('../../middleware/upload');
const authtoken = require('../../middleware/auth/jwt');

router.get('/', async (req, res) => {
    try{
        const tool = await Tool.find().sort({$natural: -1});
        res.json(tool);
    }catch (err){
        res.json({message: err});
    }
});

router.post('/', authtoken, upload.single('photo'), async (req, res) => {
    const {name, quantity, description, specification, termsandconditions} = { ...req.body};
    const photo = req?.file?.filename;
    if (!name && !quantity && !description) return res.status(400).json({message: "One field must be provided"});
    const newTool = new Tool({photo, name, quantity, description, specification, termsandconditions});
    try{
        const savedTool = await newTool.save();
        res.json(savedTool);
    }catch (err){
        res.json({message: err});
    }
});

router.put('/:_id', authtoken, upload.single('photo'), async (req, res) => {
    const _id = req.params._id;
    let tool = { ...req.body, $update_at: new Date()};
    const photo = req?.file?.filename;
    tool.photo = photo;
    try{
        const updatedTool = await Tool.updateOne({_id},{ $set: { ...tool}});
        res.json({success: true});
    }catch (err) {
        console.error(`error: ${err}\nthe id: ${err.value} was not found`);
        res.status(404).json({message: err});
    }
});

router.delete('/:_id', authtoken,  async (req, res) =>{
    try{
        const deletetool = await Tool.deleteOne({_id: req.params._id});
        res.json({success: true});
    }catch (err){
        res.status(404).json({message: err, success: false});
    }
});


module.exports = router;