const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoControllers');

router.post('/todos', authenticateToken, createTodo);
router.get('/todos', authenticateToken, getTodos);
router.put('/todos/:id', authenticateToken, updateTodo);
router.delete('/todos/:id', authenticateToken, deleteTodo);

module.exports = router;
