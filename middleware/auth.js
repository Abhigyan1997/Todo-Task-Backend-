const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET = 'your_jwt_secret';

async function authenticateToken(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid token' });
  }
}

module.exports = { authenticateToken };
