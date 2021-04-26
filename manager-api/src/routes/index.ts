import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';

import AuthController from '../controllers/AuthController';
import { SearchProjectsController } from '../controllers/SearchProjectsController';
import { ProjectsController } from '../controllers/ProjectController';
import { UserController } from '../controllers/UserController';

// Instance
const router = Router();

const userController = new UserController;
const projectController = new ProjectsController;
const searchController = new SearchProjectsController;

// Routes

// User Routes
router.post('/user', userController.create);
router.patch('/user/:id', userController.edit);
router.get('/user', userController.list);
router.get('/user/:id', userController.GetAnUser);
router.delete('/user/:id', userController.delete);

// Auth User
router.post('/auth', AuthController.authenticate);

// Project Routes
router.post('/project', projectController.create);
router.get('/projects', projectController.list);
router.get('/project/:id', projectController.getProject);
router.patch('/project/:id', projectController.edit);
router.delete('/project/:id', projectController.delete); 

// Project Filters
router.get('/projects/:id', searchController.headerFilters);
router.get('/filter/:id', searchController.filterSet);

// router.post('/test', projectController.test);

export default router;
