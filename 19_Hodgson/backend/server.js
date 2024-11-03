const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// mostly getting image upload to work
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB connection
const uri = 'mongodb+srv://kiarajade:PpZ1hZ4n6bqF0Itm@imy220.rfpry.mongodb.net/PlaylistDB?retryWrites=true&w=majority&appName=IMY220';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/user'); 
const playlistRoutes = require('./routes/playlist'); 
const songRoutes = require('./routes/song'); 
const commentsRouter = require('./routes/comments');
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');

// API routes
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/comments', commentsRouter);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);




// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
