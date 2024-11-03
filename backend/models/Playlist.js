const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, maxlength: 500 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    songIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    songCount: { type: Number, default: 0 },
    coverImage: { type: String },
  },
  { timestamps: true }
);

playlistSchema.virtual('creatorName').get(function () {
  return this.userId?.username || 'Unknown User';
});

playlistSchema.set('toObject', { virtuals: true });
playlistSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Playlist', playlistSchema);
