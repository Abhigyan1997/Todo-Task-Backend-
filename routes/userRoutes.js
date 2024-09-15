const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { registerUser, loginUser } = require('../controllers/userControlers');
const User=require('../models/userModel')

const ipLogger = (req, res, next) => {
    // Capture the IP address from the request headers or connection
    req.ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
  };

router.post('/register', async (req, res) => {
  try {
    const user = await registerUser(req.body.email, req.body.password);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post('/login', ipLogger, async (req, res) => {
    try {
      const { user, token } = await loginUser(req.body.email, req.body.password, req.ipAddress);
      res.send({ user, token });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  router.get('/logout', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Use the correct field in req.user (e.g., `id`)
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Update user session with logout time
        if (user.sessions.length > 0) {
            const lastSession = user.sessions[user.sessions.length - 1];
            lastSession.logoutTime = new Date(); // Update the last session
        }

        await user.save();

        // Clear cookies if needed
        res.clearCookie('connect.sid', { path: '/' });
        res.status(200).send('Logged out successfully');
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});




module.exports = router;
