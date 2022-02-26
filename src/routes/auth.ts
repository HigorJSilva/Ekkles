import express from 'express';
import { authenticate, register } from '../controllers/AuthController';
import { validateRequest } from '../middleware/validateRequest';
import { RegisterRequest } from '../requests/ResgisterRequest';
const router = express.Router()


router.post('/authenticate', authenticate);     
router.post('/register', RegisterRequest, validateRequest,  register);     

  
export  {router as authRoutes};