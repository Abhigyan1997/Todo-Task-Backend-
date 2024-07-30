const Todo = require('../models/todoModels');
const createError = require('http-errors');

async function createTodoService(userId, title, description) {
  try {
    const todo = new Todo({ userId, title, description });
    await todo.save();
    return todo;
  } catch (error) {
    throw createError(500, 'Error creating to-do item');
  }
}

async function getTodosService(userId) {
  try {
    const todos = await Todo.find({ userId });
    return todos;
  } catch (error) {
    throw createError(500, 'Error fetching to-do items');
  }
}

async function updateTodoService(userId, todoId, updateData) {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      updateData,
      { new: true }
    );
    if (!todo) {
      throw createError(404, 'To-do item not found');
    }
    return todo;
  } catch (error) {
    throw createError(500, 'Error updating to-do item');
  }
}

async function deleteTodoService(userId, todoId) {
  try {
    const todo = await Todo.findOneAndDelete({ _id: todoId, userId });
    if (!todo) {
      throw createError(404, 'To-do item not found');
    }
    return todo;
  } catch (error) {
    throw createError(500, 'Error deleting to-do item');
  }
}

module.exports = {
  createTodoService,
  getTodosService,
  updateTodoService,
  deleteTodoService
};
