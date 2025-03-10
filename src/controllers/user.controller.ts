// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { IUser } from '../models/user.js';
import { UserService } from '../services/user.js';
import { validationResult } from "express-validator";

const userService = new UserService();

// Controller (HTTP) for creating a new user
export async function createUser(req: Request, res: Response): Promise<Response> {
  
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Create a new user
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

// Controller (HTTP) for getting all users
export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    console.log('Get users');
    const users = await userService.getUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get users' });
  }
}

// Controller (HTTP) for getting a user by id
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

// Controller (HTTP) for deleting a user by id
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

// Controller (HTTP) for updating a user by id
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
