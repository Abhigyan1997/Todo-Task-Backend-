const express = require('express');
const router = express.Router();
const User=require('../models/userModel')
const { authenticateToken } = require('../middleware/auth');

router.get('/sessions', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('sessions');
  res.send(user.sessions);
});

module.exports = router;
