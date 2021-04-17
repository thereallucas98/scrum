import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';

import { ProjectsController } from '../controllers/ProjectController';
import { UserController } from '../controllers/UserController';

// Instance
const router = Router();

const userController = new UserController;
const projectController = new ProjectsController;

// Routes

// User Routes
router.post('/user', userController.create);
router.put('/user/:id', userController.edit);
router.get('/user', userController.listAllUsers);
router.get('/user/:id', userController.GetAnUser);
router.delete('/user/:id', userController.delete);

// Project Routes
router.post('/project', projectController.create);
router.get('/projects', projectController.list);

export default router;
