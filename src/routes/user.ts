import { Router } from 'express';
import { userValidationRules } from '../middlewares/user.validator'

const router = Router();

import { createUser, getUsers, getUser, deleteUser, updateUser } from '../controllers/user.controller'

router.get( "/", getUsers);
router.post( "/", userValidationRules(), createUser );
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
