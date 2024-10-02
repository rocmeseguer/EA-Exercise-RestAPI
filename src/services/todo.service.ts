
import { ITodo, TodoModel } from '../models/Todo';

export class TodoService {
  async createTodo(data: Partial<ITodo>): Promise<ITodo> {
    const todo = new TodoModel(data);
    return await todo.save();
  }

  async getTodos(): Promise<ITodo[]> {
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
