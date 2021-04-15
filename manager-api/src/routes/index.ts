import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';

import { UserController } from '../controllers/UserController';

// Instance
const router = Router();

const userController = new UserController;

// Routes

// User Routes
router.post('/user', userController.create);
router.put('/user/:id', userController.edit);
router.get('/user', userController.listAllUsers);

export default router;
