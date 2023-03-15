import { Request, Response } from 'express'

import { ITodo, TodoModel } from '../models/Todo';

export function helloWorld (req: Request, res: Response): Response { 
  return res.send('hello world');
}

export async function createTodo (req: Request, res: Response): Promise<Response> {
  const { id, user, name, completed } = req.body;
  console.log('Creating todo');
  const newTodo = {
    id: id,
    user: user,
    name: name,
    completed: completed
  }
  const todo = new TodoModel(newTodo);
  await todo.save();
  console.log(todo);

  return res.json({
    message: "Todo created",
    todo
  });
}

export async function getTodos (req: Request, res: Response): Promise<Response> {
  console.log('Get todos');
  const todos = await TodoModel.find();
  return res.json(todos);
}

export async function getTodo(req: Request, res: Response): Promise<Response> {
  console.log('Get todo');
  const _id = req.params.id;
  const todo = await TodoModel.findById(_id).populate('user');
  console.log(todo);
  return res.json(todo);
}

export async function deleteTodo(req: Request, res: Response): Promise<Response> {
  console.log('Delete todo');
  const _id = req.params.id;
  const todo = await TodoModel.findByIdAndRemove(_id);
  return res.json({
    message: "Todo deleted",
    todo
  });
}

export async function updateTodo(req: Request, res: Response): Promise<Response> {
  console.log('Update todo');
  const _id = req.params.id;
  const { id, user, name, completed } = req.body; // Destructuring 
  const todo = await TodoModel.findByIdAndUpdate(_id, {
    id,
    user,
    name,
    completed
  }, {new: true});
  return res.json({
    message: "Todo updated",
    todo
  });
}
