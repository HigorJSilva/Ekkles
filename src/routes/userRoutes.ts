import express from 'express';
import { me, update, remove } from '../controllers/UserController';
import {authorize} from '../middleware/Auth';
import { validateRequest } from '../middleware/ValidateRequest';
import { UpdateRequest } from '../requests/UserRequests';

const router = express.Router()
//@ts-ignore
router.put('/', authorize(), validateRequest, UpdateRequest, update);     
router.delete('/', authorize(), remove);     
router.get('/', authorize(), me);     

export  {router as userRoutes};