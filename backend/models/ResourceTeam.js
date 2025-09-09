const mongoose = require('mongoose');

ResourceTeamSchema = mongoose.Schema({
    name: {
        type: String
    },
    role: {
        type: String,
    },
    photo: {
        type: String,
    },
    duty: {
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

module.exports = mongoose.model('ResourceTeam', ResourceTeamSchema);