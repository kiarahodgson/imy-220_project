const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {

  const { username, email, password } = req.body;

  // Validates username, email, and password
  if (!email || !username || !password) {
      return res.status(400).send({ message: 'Email, username, and password are needed.' });
  }

  // Checks that email follows convention
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
      return res.status(400).send({ message: 'Incorrect email format.' });
  }

  try {
      // Checks if the username is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).send({ message: 'Username already in use, try something else.' });
      }

      // Hashes password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
          username,
          email,
          password: hashedPassword,
      });
      await newUser.save();
      res.status(201).send({ message: 'User successfully created.', user: newUser });
  } catch (error) {
      console.error('Error creating user:', error); // used if there is any error at all
      res.status(400).send({ message: 'Error creating user.', error });
  }
});




// Gets all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching users.', error });
    }
});

// Gets users by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching user.', error });
    }
});

// Put method to update user by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send({ message: 'Error updating user.', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // ensures email and password are present and match
    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        res.status(200).send({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in.', error });
    }
});

module.exports = router;
