// src/services/user.service.ts
import { IUser, UserModel } from '../models/user';
import { Types } from 'mongoose';

export class UserService {
  // Create a new user
  async createUser(user: Partial<IUser>): Promise<IUser|null> {
    const newUser = new UserModel(user);
    return await newUser.save()
  }

  // Get all users
  async getUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  // Find User by _id
  async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  // Find User by email
  async getUserByEmail(email: string): Promise<IUser|null> {
    return await UserModel.findOne({email: email});
  }

  // Delete User by _id
  async deleteUserById(id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndRemove(id);
  }

  // Insert Todo of User by _id
  async insertTodoOfUserById(userId: Types.ObjectId, todoId: Types.ObjectId): Promise<void|null> {
    return await UserModel.findByIdAndUpdate(userId ,{$addToSet:{todos: todoId}});
  }

  // Update User by _id
  async updateUserById(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }
}
