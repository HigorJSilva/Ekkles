import express from 'express';
import { me, update, remove } from '../controllers/UserController';
import { validateRequest } from '../middleware/ValidateRequest';
import { UpdateRequest } from '../requests/UserRequests';

const router = express.Router()

router.put('/', validateRequest, UpdateRequest, update);     
router.delete('/', remove);     
router.get('/', me);     

export  {router as userRoutes};