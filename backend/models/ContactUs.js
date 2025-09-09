const mongoose = require('mongoose');

ContactUsSchema = mongoose.Schema({
    body: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    multitel: {
        type: Array,
        default: [{type: String}],
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        default: false,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ContactUs', ContactUsSchema);