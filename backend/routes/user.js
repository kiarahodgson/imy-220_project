const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || $3cur3K3y;


router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).send({ message: 'Email, username, and password are required.' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).send({ message: 'Invalid email format.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        
        await newUser.save();
        res.status(201).send({ message: 'User successfully created.', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
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

// Gets user by ID including friend details
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('friends', '_id name bio profileImage');

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        console.log("User data after fetch (before populate check):", user);
        console.log("Friends data (should be populated):", user.friends);

        res.status(200).send({ ...user.toObject(), friendCount: user.friends.length });
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).send({ message: 'Error fetching user profile', error });
    }
});





router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, username, pronouns, bio, socialLinks, profileImage, friends } = req.body;

    // Construct an object with all fields to ensure they are included in the update
    const updateFields = {
        name: name || "",                  // Set default empty string if value is missing
        username: username || "",
        pronouns: pronouns || "",
        bio: bio || "",
        socialLinks: Array.isArray(socialLinks) ? socialLinks : [],  // Ensure it's an array
        profileImage: profileImage || "",
        friends: Array.isArray(friends) ? friends : []               // Ensure it's an array
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating profile', error });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

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

        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                profileImage: user.profileImage,
                bio: user.bio,
                pronouns: user.pronouns,
                socialLinks: user.socialLinks,
                friends: user.friends,
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in.', error });
    }
});

router.post('/:id/add-friend', async (req, res) => {
    const { id } = req.params;  // Logged-in ID
    const { friendId } = req.body;  // Friend ID

    if (!id || !friendId) {
        return res.status(400).json({ message: 'User ID and Friend ID are required' });
    }

    try {
        const friend = await User.findById(friendId);
        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $addToSet: { friends: friendId } },
            { new: true }
        );

        await User.findByIdAndUpdate(
            friendId,
            { $addToSet: { friends: id } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser.friends);
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ message: 'Error adding friend', error });
    }
});


// Checks if users are friends
router.get('/:userId/is-friend/:loggedInUserId', async (req, res) => {
  const { userId, loggedInUserId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isFriend = user.friends.includes(loggedInUserId);
    res.status(200).json({ isFriend });
  } catch (error) {
    console.error('Error checking friendship status:', error);
    res.status(500).json({ message: 'Error checking friendship status', error });
  }
});

  

module.exports = router;
