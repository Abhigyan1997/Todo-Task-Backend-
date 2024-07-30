const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
  loginTime: Date,
  logoutTime: Date,
  ipAddress: String
});

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sessions: [sessionSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
