const express = require('express');
const User = require('../models/User');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const router = express.Router();

const buildRegex = (term) => new RegExp(term.split('').join('.*'), 'i');

router.get('/', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: 'Query term is required' });

  try {
    const regex = buildRegex(query);

    // Searches through users
    const users = await User.find({
      $or: [{ name: regex }, { username: regex }]
    });

    // Search through Songs
    const songs = await Song.find({
      $or: [{ title: regex }, { artist: regex }]
    });

    // Search through playlists
    const playlists = await Playlist.find({
      $or: [
        { title: regex },
        { genre: regex },
        { hashtags: { $elemMatch: { $regex: regex } } }
      ]
    });

    res.status(200).json({ users, songs, playlists });
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ message: 'Error performing search' });
  }
});

module.exports = router;
