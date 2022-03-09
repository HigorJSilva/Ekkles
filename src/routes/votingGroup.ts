import express from 'express';
import { index, store } from '../services/VotingGroupService';
import {authorize} from '../middleware/Auth';
import { validateRequest } from '../middleware/ValidateRequest';
import { AuthenticatedUserRequest } from '../requests/AuthenticatedUserRequest';
import { StoreVotingGroupRequest } from '../requests/VotingGroupRequest';
import { Roles } from '../helpers/Roles';

const router = express.Router()

router.get('/', authorize(Roles.Admin), AuthenticatedUserRequest, validateRequest, index);
router.post('/', authorize(Roles.Admin), StoreVotingGroupRequest, validateRequest,  store);

export  {router as votingGroupRoutes};