import { Request, Response, NextFunction } from 'express'
import { body } from 'express-validator';

// User validation rules
export const userValidationRules = () => {
  return [
    body('email').isEmail().withMessage('email is invalid'),
  ]
}
