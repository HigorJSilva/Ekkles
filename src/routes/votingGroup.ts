import express from 'express';
import { index, store, update, remove } from '../controllers/VotingGroupController';
import {authorize} from '../middleware/Auth';
import { validateRequest } from '../middleware/ValidateRequest';
import { AuthenticatedUserRequest } from '../requests/AuthenticatedUserRequest';
import { StoreVotingGroupRequest, UpdateVotingGroupRequest, RemoveVotingGroupRequest } from '../requests/VotingGroupRequest';
import { Roles } from '../helpers/Roles';

const router = express.Router()

router.get('/', authorize(Roles.Admin), AuthenticatedUserRequest, validateRequest, index);
router.post('/', authorize(Roles.Admin), StoreVotingGroupRequest, validateRequest,  store);
router.put('/:id', authorize(Roles.Admin), UpdateVotingGroupRequest, validateRequest,  update);
router.delete('/:id', authorize(Roles.Admin), RemoveVotingGroupRequest, validateRequest,  remove);

export  {router as votingGroupRoutes};