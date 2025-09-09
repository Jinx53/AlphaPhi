const mongoose = require('mongoose');

AboutUsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('AboutUs', AboutUsSchema);