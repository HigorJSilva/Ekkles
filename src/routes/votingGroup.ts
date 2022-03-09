import express from 'express';
import { index, store } from '../services/VotingGroupService';
import {authorize} from '../middleware/Auth';
import { validateRequest } from '../middleware/ValidateRequest';
import { AuthenticatedUserRequest } from '../requests/AuthenticatedUserRequest';
import { StoreVotingGroupRequest } from '../requests/VotingGroupRequest';

const router = express.Router()

router.get('/', AuthenticatedUserRequest, validateRequest, index);
router.post('/', StoreVotingGroupRequest, validateRequest, store);
// router.get('/:id', authorize(), validateRequest, UpdateRequest, search);
// router.put('/:id', authorize(), validateRequest, UpdateRequest, search);
// router.delete('/:id', authorize(), remove);

export  {router as votingGroupRoutes};