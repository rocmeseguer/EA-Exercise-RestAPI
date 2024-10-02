// src/services/user.service.ts
import { IUser, UserModel } from '../models/User';

export class UserService {
  async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(data);
    return await user.save();
  }

  async getUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async deleteUserById(id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndRemove(id);
  }

  async updateUserById(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }
}
