import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator';

// https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go

export const userValidationRules = () => {
  return [
    body('email').isEmail().withMessage('email is invalid'),
  ]
}

export async function userValidator (req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next()
  }
  
  return res.status(422).json(errors.array());
}
