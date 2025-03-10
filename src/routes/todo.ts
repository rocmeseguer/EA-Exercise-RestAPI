import { Router } from 'express';
const router = Router();

import { createTodo, getTodos, getTodo, deleteTodo, updateTodo } from '../controllers/todo.controller'

// All routes are starting with /api/todos
router.get( "/", getTodos);
router.post( "/", createTodo );
router.get('/:id', getTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
