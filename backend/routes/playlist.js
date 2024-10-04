const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

// Create a new playlist
router.post('/', async (req, res) => {
  try {
    // Extract userId from request for later use
    const { name, description, userId } = req.body; 
    const newPlaylist = new Playlist({
      name,
      description,
      userId, // link playlist with user
      songCount: 0,
    });
    await newPlaylist.save();
    res.status(201).send(newPlaylist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get playlsts
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).send(playlists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get playlists by ID
const getPlaylistsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const playlists = await Playlist.find({ userId: userId }); // Fetch playlists for the user

    // Adds songCount to every playlist using the array length (doesn't take into account song repeats)
    const playlistsWithCount = playlists.map(playlist => ({
      ...playlist._doc,
      songCount: playlist.songIds.length,
    }));

    res.json(playlistsWithCount); // returns json with songcount included
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


router.get('/user/:userId', getPlaylistsByUserId);

// put method to update playlist using ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedPlaylist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete playlist by ID
router.delete('/:id', async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add to playlist
router.put('/:playlistId/add-song', async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.playlistId);

    if (!playlist) {
      return res.status(404).send('Playlist not found');
    }

    playlist.songIds.push(songId);
    await playlist.save();

    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
