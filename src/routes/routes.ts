import express from 'express';
import { authRoutes } from './authRoutes';
import { surveyRoutes } from './surveyRoutes';
import { userRoutes } from './userRoutes';
import { votingGroupRoutes } from './votingGroup';

const routes = express.Router();
routes.use('/', authRoutes);
routes.use('/user', userRoutes);
routes.use('/voting-group', votingGroupRoutes);
routes.use('/survey', surveyRoutes);

export  {routes};