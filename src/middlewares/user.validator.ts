import { Request, Response, NextFunction } from 'express'
import { body } from 'express-validator';

// User validation rules
// This function will be used as a middleware in the user routes
// It will validate the request body for the user routes
// It will check if the email is a valid email

export const userValidationRules = () => {
  return [
    body('email').isEmail().withMessage('email is invalid'),
  ]
}
