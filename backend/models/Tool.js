const mongoose = require('mongoose');

ToolSchema = mongoose.Schema({
    photo: {
        type: String
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    specification: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    termsandconditions: {
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

module.exports = mongoose.model('Tool', ToolSchema);