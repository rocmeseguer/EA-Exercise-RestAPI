
import { ITodo, TodoModel } from '../models/todo';
import { IUser, UserModel } from '../models/user.js';
import { UserService } from '../services/user.js';
import { Types } from 'mongoose';

const userService = new UserService();

export class TodoService {
  // Insert a Todo
  async createTodo(todo:Partial<ITodo>, userId: Types.ObjectId): Promise<ITodo|null> {
  
    todo.user = userId;

    // Insert Todo
    const newTodo = new TodoModel(todo);
    const insertedTodo = await newTodo.save();
    if (!insertedTodo) {
        return null;
    } 

    // Insert Todo in User
    await userService.insertTodoOfUserById(userId, insertedTodo._id);

    return insertedTodo;
  }


  // Insert a user's Todo
  async createTodoWithUser(todo:Partial<ITodo>, user: IUser): Promise<ITodo|null> {

    // Find User by email
    const userFound = await UserModel.findOne({ email: user.email });
    if (!userFound) {
        return null;
    } 
    
    // Todo with user's _id
    todo.user = userFound._id;

    // Insert Todo
    const newTodo = new TodoModel(todo);
    const insertedTodo = await newTodo.save();
    if (!insertedTodo) {
        return null;
    } 

    // Insert Todo in User
    await userService.insertTodoOfUserById(userFound._id, insertedTodo._id);

    return insertedTodo;
  }

  async getTodos(): Promise<ITodo[]> {
    console.log('Get todos');
    return await TodoModel.find();
  }

  async getTodoById(id: string): Promise<ITodo | null> {
    return await TodoModel.findById(id).populate('user');
  }

  async deleteTodoById(id: string): Promise<ITodo | null> {
    return await TodoModel.findByIdAndRemove(id);
  }

  async updateTodoById(id: string, data: Partial<ITodo>): Promise<ITodo | null> {
    return await TodoModel.findByIdAndUpdate(id, data, { new: true });
  }
}
