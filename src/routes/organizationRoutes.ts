import { Router } from 'express';
import * as orgController from '../controllers/organizationController.js';

const router = Router();

// GET all organizations
router.get('/', orgController.getAllOrgs);

// GET a specific organization
router.get('/:id', orgController.getOrg);

// POST create a new organization
router.post('/', orgController.createNewOrg);

// PUT update an organization
router.put('/:id', orgController.updateOrg);

// DELETE an organization
router.delete('/:id', orgController.removeOrg);

export default router;