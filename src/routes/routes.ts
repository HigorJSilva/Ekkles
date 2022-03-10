import express from 'express';
import { Roles } from '../helpers/Roles';
import { authorize } from '../middleware/Auth';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { votingGroupRoutes } from './votingGroup';

const routes = express.Router();
routes.use('/', authRoutes);
routes.use('/user', userRoutes);
routes.use('/voting-group', votingGroupRoutes);

export  {routes};