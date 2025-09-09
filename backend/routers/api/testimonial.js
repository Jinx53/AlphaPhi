const express = require('express');
const router = express.Router();
const Testimonial = require('../../models/Testimonial');
const upload = require('../../middleware/upload');
const authtoken = require('../../middleware/auth/jwt');

router.get('/', async (req, res) => {
    try{
        const testimonial = await Testimonial.find().sort({$natural: -1});
        res.json(testimonial);
    }catch (err){
        res.json({message: err});
    }
});

router.post('/', authtoken, upload.single('image'), async (req, res) => {
    const {author, profession, testimonial} = { ...req.body};
    const image = req?.file?.filename;
    if (!author && !profession && !testimonial) return res.status(400).json({message: "One field must be provided"});
    const newTestimonial = new Testimonial({image, author, profession, testimonial});
    try{
        const savedTestimonial = await newTestimonial.save();
        res.json(savedTestimonial);
    }catch (err){
        res.json({message: err});
    }
});

router.put('/:_id', authtoken, upload.single('image'), async (req, res) => {
    const _id = req.params._id;
    let testimonial = { ...req.body, $update_at: new Date()};
    const image = req?.file?.filename;
    testimonial.image = image;
    try{
        const updatedTestimonial = await Testimonial.updateOne({_id},{ $set: { ...testimonial}});
        res.json({success: true});
    }catch (err) {
        console.error(`error: ${err}\nthe id: ${err.value} was not found`);
        res.status(404).json({message: err});
    }
});

router.delete('/:_id', authtoken,  async (req, res) =>{
    try{
        const deleteTestimonial = await Testimonial.deleteOne({_id: req.params._id});
        res.json({success: true});
    }catch (err){
        res.status(404).json({message: err, success: false});
    }
});


module.exports = router;