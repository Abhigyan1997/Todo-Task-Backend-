const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Route to retrieve all user sessions
router.get('/sessions', async (req, res) => {
  try {
    // Find all users and their sessions
    const users = await User.find().select('sessions');

    if (!users.length) {
      return res.status(404).send({ message: 'No sessions found' });
    }

    // Extract sessions from users
    const allSessions = users.flatMap(user => user.sessions);

    // Send all sessions
    res.status(200).send(allSessions);
  } catch (error) {
    // Handle any errors
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
