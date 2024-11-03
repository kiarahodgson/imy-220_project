const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

router.post('/', async (req, res) => {
  try {
    const { title, description, userId, coverImage } = req.body;
    console.log("Received coverImage:", coverImage);

    const newPlaylist = new Playlist({
      title,
      description,
      userId,
      coverImage,
      songIds: [],
      songCount: 0,
    });
    await newPlaylist.save();
    res.status(201).send(newPlaylist);
  } catch (error) {
    res.status(400).send({ message: 'Error creating playlist', error });
  }
});

// Remove a song from a playlist
router.put('/:playlistId/remove-song', async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.playlistId);

    if (!playlist) {
      return res.status(404).send({ message: 'Playlist not found' });
    }

    playlist.songIds = playlist.songIds.filter(id => id.toString() !== songId);
    playlist.songCount = playlist.songIds.length;

    await playlist.save();
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send({ message: 'Error removing song from playlist', error });
  }
});

// gets all friends
router.get('/friends', async (req, res) => {
  const { friendIds } = req.query;

  try {
    const playlists = await Playlist.find({ userId: { $in: friendIds } })
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send(playlists);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching friend playlists', error });
  }
});

// Gets all playlists in reverse chrono
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find()
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).send(playlists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a playlist by ID and populate with some details
router.get('/:playlistId', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId)
      .populate('songIds')
      .populate('userId', 'username');
    if (!playlist) {
      return res.status(404).send({ message: 'Playlist not found' });
    }
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching playlist', error });
  }
});


router.put('/:playlistId', async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      req.params.playlistId,
      { title, description },
      { new: true }
    ).populate('songIds').populate('userId', 'username');
    if (!updatedPlaylist) {
      return res.status(404).send('Playlist not found');
    }
    res.status(200).send(updatedPlaylist);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:playlistId/add-song', async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { songId } = req.body;

    // Finds playlist by ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).send({ message: 'Playlist not found' });
    }

    // Checks if the song is already there
    if (playlist.songIds.includes(songId)) {
      return res.status(400).send({ message: 'Song already in playlist' });
    }

    // Adds song to playlist
    playlist.songIds.push(songId);
    playlist.songCount = playlist.songIds.length;

    // Save
    await playlist.save();
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send({ message: 'Error adding song to playlist', error });
  }
});

// Get playlists by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const playlists = await Playlist.find({ userId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .exec();
      
    res.status(200).send(playlists);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user playlists', error });
  }
});

// delete playlst route
router.delete('/:playlistId', async (req, res) => {
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.playlistId);
    if (!deletedPlaylist) {
      return res.status(404).send({ message: 'Playlist not found' });
    }
    res.status(200).send({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting playlist', error });
  }
});


module.exports = router;
