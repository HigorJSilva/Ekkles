import express from 'express';
import { me, update, remove } from '../controllers/UserController';
import { authorize } from '../middleware/Auth';
import { validateRequest } from '../middleware/ValidateRequest';
import { AuthenticatedUserRequest } from '../requests/AuthenticatedUserRequest';
import { UpdateRequest } from '../requests/UserRequests';

const router = express.Router()

router.put('/', authorize(), validateRequest, UpdateRequest, update);     
router.delete('/', authorize(), validateRequest, AuthenticatedUserRequest, remove);     
router.get('/', authorize(), AuthenticatedUserRequest, me);     

export  {router as userRoutes};