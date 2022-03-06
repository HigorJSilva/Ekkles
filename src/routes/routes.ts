import express from 'express';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';

const routes = express.Router();
routes.use('/', authRoutes);
routes.use('/user/', userRoutes);

export  {routes};