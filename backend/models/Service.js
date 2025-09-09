const mongoose = require('mongoose');

ServiceSchema = mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String,
    },
    photo: {
        type: String,
    },
    footer: {
        type: String
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

module.exports = mongoose.model('Service', ServiceSchema);