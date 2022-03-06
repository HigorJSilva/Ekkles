import express from 'express';
import { authenticate, register } from '../controllers/AuthController';
import { validateRequest } from '../middleware/ValidateRequest';
import { RegisterRequest, LoginRequest } from '../requests/AuthRequests';
const router = express.Router()


router.post('/login',  LoginRequest, validateRequest, authenticate);     
router.post('/register', RegisterRequest, validateRequest,  register);     

  
export  {router as authRoutes};