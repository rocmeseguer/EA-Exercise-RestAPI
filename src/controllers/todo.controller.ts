// src/controllers/todo.controller.ts
import { Request, Response } from 'express';
import { TodoService } from '../services/todo.js';
import { ITodo } from '../models/todo.js';

const todoService = new TodoService();

// Controller (HTTP) for creating a new todo
export async function createTodo(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Creating todo');
    const { user, name, completed } = req.body as ITodo;
    const newTodo: Partial<ITodo> = { user, name, completed };

    const todo = await todoService.createTodo(newTodo, user);
    
    return res.json({
      message: "Todo created",
      todo
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create todo' });
  }
}

// Controller (HTTP) for getting all todos
export async function getTodos(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Get todos');
    const todos = await todoService.getTodos();
    return res.json(todos);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get todos' });
  }
}

// Controller (HTTP) for getting a todo by id
export async function getTodo(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Get todo');
    const _id = req.params.id;
    const todo = await todoService.getTodoById(_id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json(todo);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get todo' });
  }
}

// Controller (HTTP) for deleting a todo by id
export async function deleteTodo(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Delete todo');
    const _id = req.params.id;
    const todo = await todoService.deleteTodoById(_id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json({
      message: "Todo deleted",
      todo
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete todo' });
  }
}

// Controller (HTTP) for updating a todo by id
export async function updateTodo(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Update todo');
    const _id = req.params.id;
    const { user, name, completed } = req.body as ITodo;
    const updatedTodo: Partial<ITodo> = { user, name, completed };
    const todo = await todoService.updateTodoById(_id, updatedTodo);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json({
      message: "Todo updated",
      todo
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update todo' });
  }
}
