const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Fetch comments for a specific playlist with optional limit
router.get('/:playlistId', async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const limit = parseInt(req.query.limit) || 10;

    const comments = await Comment.find({ playlistId })
      .sort({ timestamp: -1 }) // Sort by most recent first
      .limit(limit);

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

router.post('/:playlistId', async (req, res) => {
  try {
    const { text, userId, username } = req.body;
    const playlistId = req.params.playlistId;

    const newComment = new Comment({
      text,
      userId,
      username,
      playlistId,
      timestamp: Date.now(),
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like comment
router.put('/:commentId/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unlike comment
router.put('/:commentId/unlike', async (req, res) => {
  try {
    const { userId } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { $pull: { likes: userId } },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
