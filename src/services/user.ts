// src/services/user.service.ts
import { IUser, UserModel } from '../models/user';
import { logger } from '../config/logger';
import { Types } from 'mongoose';

export class UserService {
  // Create a new user
  async createUser(user: Partial<IUser>): Promise<IUser|null> {
    logger.info(user, "createUser - New User to insert");
    const newUser = new UserModel(user);
    const insertedUser = await newUser.save();
    if (!insertedUser) {
      return null;
    }
    return insertedUser;
  }

  // Get all users
  async getUsers(): Promise<IUser[]> {
    logger.info("getUsers - Fetching all users");
    return await UserModel.find();
  }

  // Find User by _id
  async getUserById(id: string): Promise<IUser | null> {
    logger.info({ id }, "getUserById - Fetching user by ID");
    const user = await UserModel.findById(id);
    if (!user) {
      return null;
    }
    return user;
  }

  // Find User by email
  async getUserByEmail(email: string): Promise<IUser|null> {
    logger.info({ email }, "getUserByEmail - Fetching user by email");
    const user = await UserModel.findOne({email: email});
    if (!user) {
      return null;
    }
    return user;
  }

  // Delete User by _id
  async deleteUserById(id: string): Promise<IUser | null> {
    logger.info({ id }, "deleteUserById - Deleting user by ID");
    const deletedUser = await UserModel.findByIdAndRemove(id);
    if (!deletedUser) {
      return null;
    }
    return deletedUser;
  }

  // Insert Todo of User by _id
  async insertTodoOfUserById(userId: Types.ObjectId, todoId: Types.ObjectId): Promise<void|null> {
    logger.info({ userId, todoId }, "insertTodoOfUserById - Inserting todo to user");
    const updatedUser = await UserModel.findByIdAndUpdate(userId ,{$addToSet:{todos: todoId}});
    if (!updatedUser) {
      return null;
    }
  }

  // Update User by _id
  async updateUserById(id: string, data: Partial<IUser>): Promise<IUser | null> {
    logger.info({ id, data }, "updateUserById - Updating user by ID");
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) {
      return null;
    }
    return updatedUser;
  }
}
