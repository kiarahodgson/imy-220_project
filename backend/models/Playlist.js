const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    songIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    songCount: {
        type: Number,
        default: 0 // fallback song count
    }
});

module.exports = mongoose.model('Playlist', playlistSchema);
