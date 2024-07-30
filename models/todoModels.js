const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
