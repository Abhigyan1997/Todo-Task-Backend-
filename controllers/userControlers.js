const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(email, password) {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return {
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

async function loginUser(email, password, ipAddress) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Record session with IST time
    const session = {
      loginTime: moment().tz('Asia/Kolkata').toDate(),
      ipAddress,
    };
    user.sessions.push(session);
    await user.save();

    return {
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// async function logoutUser(userId) {
//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       throw new Error('User not found');
//     }

//     // Find the most recent session and update it with the logout time
//     const session = user.sessions[user.sessions.length - 1];
//     if (session) {
//       session.logoutTime = new Date(); // Set the logout time to the current time
//     }

//     await user.save();
//     return {
//       success: true,
//       message: 'Logout successful',
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// }

module.exports = { registerUser, loginUser };
