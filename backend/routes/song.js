const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// route to create song
router.post('/', async (req, res) => {
    try {
        const newSong = new Song(req.body);
        await newSong.save();
        res.status(201).send(newSong);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get method for every song
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).send(songs);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
