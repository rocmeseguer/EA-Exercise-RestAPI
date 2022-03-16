import { Router } from 'express';
const router = Router();

import { createTodo, getTodos, getTodo, deleteTodo, updateTodo } from '../controllers/todo.controller'

router.route('/')
  .post(createTodo)
  .get(getTodos)

router.route('/:id')
  .get(getTodo)
  .delete(deleteTodo)
  .put(updateTodo)

export default router;
