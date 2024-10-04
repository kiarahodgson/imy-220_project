const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = 'mongodb+srv://kiarajade:PpZ1hZ4n6bqF0Itm@imy220.rfpry.mongodb.net/PlaylistDB?retryWrites=true&w=majority&appName=IMY220';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Imports routes
const userRoutes = require('./routes/user'); 
const playlistRoutes = require('./routes/playlist'); 
const songRoutes = require('./routes/song'); 

// API routes
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starts server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
