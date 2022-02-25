import express from 'express';
import { authRoutes } from './auth';


const routes = express.Router();

routes.use('/', authRoutes)


export  {routes};