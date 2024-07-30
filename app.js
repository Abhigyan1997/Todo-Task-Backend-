require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Configure sessions
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        sameSite: 'none', // To support cross-site requests
        httpOnly: true
    }
}));


app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', todoRoutes);
app.use('/api', sessionRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
