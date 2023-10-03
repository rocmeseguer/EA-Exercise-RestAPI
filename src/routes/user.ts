import { Router } from 'express';
import { userValidationRules, userValidator } from '../middlewares/user.validator'

const router = Router();

import { createUser, getUsers, getUser, deleteUser, updateUser } from '../controllers/user.controller'

router.get( "/", getUsers);
router.post( "/", userValidationRules(), userValidator, createUser );

router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default router;
