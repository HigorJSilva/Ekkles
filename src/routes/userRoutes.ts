import express from 'express';
import { me, update, remove, getAll, getById } from '../controllers/UserController';
import { Roles } from '../helpers/Roles';
import { authorize } from '../middleware/Auth';
import { validateRequest } from '../middleware/ValidateRequest';
import { AuthenticatedUserRequest } from '../requests/AuthenticatedUserRequest';
import { getUserByIdRequest, UpdateRequest } from '../requests/UserRequests';

const router = express.Router()

router.put('/', authorize(), validateRequest, UpdateRequest, update);
router.delete('/', authorize(), validateRequest, AuthenticatedUserRequest, remove);
router.get('/', authorize(), AuthenticatedUserRequest, me);
router.get('/users/:id', authorize(Roles.Admin), getUserByIdRequest, getById);
router.get('/users', authorize(Roles.Admin), AuthenticatedUserRequest, getAll);     

export  {router as userRoutes};