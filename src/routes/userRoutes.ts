import express from 'express';
import { update } from '../controllers/UserController';
import {authorize} from '../middleware/Auth';
import { validateRequest } from '../middleware/ValidateRequest';
import { UpdateRequest } from '../requests/UserRequests';

const router = express.Router()
//@ts-ignore
router.put('/', authorize(), validateRequest, UpdateRequest, update);     

export  {router as userRoutes};