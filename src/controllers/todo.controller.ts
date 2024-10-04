// src/controllers/todo.controller.ts
import { Request, Response } from 'express';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../models/Todo';

const todoService = new TodoService();

export async function createTodo(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Creating todo');
    const { user, name, completed } = req.body as ITodo;
    const newTodo: Partial<ITodo> = { user, name, completed };

    const todo = await todoService.createTodo(newTodo);
    
    return res.json({
      message: "Todo created",
      todo
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create todo' });
  }
}

export async function getTodos(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Get todos');
    const todos = await todoService.getTodos();
    return res.json(todos);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get todos' });
  }
}

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
