const mongoose = require('mongoose');

TestimonialSchema = mongoose.Schema({
    image: {
        type: String
    },
    author: {
        type: String,
    },
    profession: {
        type: String,
    },
    testimonial: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);