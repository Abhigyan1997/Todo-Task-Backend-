const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  return user;
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
}



module.exports = { registerUser, loginUser };
