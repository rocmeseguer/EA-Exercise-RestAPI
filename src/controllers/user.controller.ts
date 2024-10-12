// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { IUser } from '../models/User';
import { UserService } from '../services/user.service';

const userService = new UserService();

export async function createUser(req: Request, res: Response): Promise<Response> {
  try {
    const { name, email, username } = req.body as IUser;
    console.log('Creating user');
    
    const newUser: Partial<IUser> = { name, email, username };
    const user = await userService.createUser(newUser);
    console.log('Creating user');
    
    return res.json({
      message: "User created",
      user
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create user' });
  }
}

export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Get users');
    const users = await userService.getUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get users' });
  }
}

export async function getUser(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Get user');
    const id = req.params.id;
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: `User with id ${id} not found` });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get user' });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Delete user');
    const id = req.params.id;
    const user = await userService.deleteUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: `User with id ${id} not found` });
    }

    return res.json({
      message: "User deleted",
      user
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete user' });
  }
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Update user');
    const _id = req.params.id;
    const { name, email, username } = req.body as IUser;
    
    const updatedUser: Partial<IUser> = { name, email, username };
    const user = await userService.updateUserById(_id, updatedUser);
    
    if (!user) {
      return res.status(404).json({ error: `User with id ${_id} not found` });
    }

    return res.json({
      message: "User updated",
      user
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update user' });
  }
}
