const express = require('express');
const Song = require('../models/Song');
const router = express.Router();

router.post('/', async (req, res) => {
  const { title, artist, link, dateAdded, addedBy } = req.body;
  try {
    const newSong = new Song({
      title,
      artist,
      link,
      dateAdded: dateAdded || Date.now(),
      addedBy,
    });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find()
      .populate('addedBy', 'username')
      .sort({ dateAdded: -1 })
      .exec();
    res.status(200).send(songs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:songId', async (req, res) => {
  try {
    const song = await Song.findById(req.params.songId);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching song', error });
  }
});

router.put('/:songId/delete', async (req, res) => {
  try {
    const { songId } = req.params;
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).send({ message: 'Song not found' });
    }

    song.deleted = true;
    await song.save();

    res.status(200).send(song);
  } catch (error) {
    res.status(500).send({ message: 'Error marking song as deleted', error });
  }
});

module.exports = router;
