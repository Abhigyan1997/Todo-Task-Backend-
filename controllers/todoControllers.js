const {
    createTodoService,
    getTodosService,
    updateTodoService,
    deleteTodoService
  } = require('../services/todoServices');
  
  async function createTodo(req, res, next) {
    try {
      const { title, description } = req.body;
      const todo = await createTodoService(req.user.id, title, description);
      res.status(201).send(todo);
    } catch (error) {
      next(error);
    }
  }
  
  async function getTodos(req, res, next) {
    try {
      const todos = await getTodosService(req.user.id);
      res.status(200).send(todos);
    } catch (error) {
      next(error);
    }
  }
  
  async function updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const todo = await updateTodoService(req.user.id, id, req.body);
      res.status(200).send(todo);
    } catch (error) {
      next(error);
    }
  }
  
  async function deleteTodo(req, res, next) {
    try {
      const { id } = req.params;
      const todo = await deleteTodoService(req.user.id, id);
      res.status(200).send({ message: 'Todo deleted' });
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
  