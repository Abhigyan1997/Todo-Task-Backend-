const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userControlers');

router.post('/register', async (req, res) => {
  try {
    const user = await registerUser(req.body.email, req.body.password);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body.email, req.body.password);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Unable to log out');
        }
        res.clearCookie('connect.sid', { path: '/' });
        res.status(200).send('Logged out successfully');
    });
});


module.exports = router;
