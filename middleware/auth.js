const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET = 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
      return res.status(401).send({ message: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', ''); // Extract the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          return res.status(403).send({ message: 'Invalid token' });
      }

      req.user = user; // Attach the user to the request
      next();
  });
};

module.exports = { authenticateToken };
