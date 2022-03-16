import express from 'express';
import { index, store, update, remove, search, vote } from '../controllers/SurveyController';
import { Roles } from '../helpers/Roles';
import { authorize } from '../middleware/Auth';
import { validateRequest } from '../middleware/ValidateRequest';
import { AuthenticatedUserRequest } from '../requests/AuthenticatedUserRequest';import { RemoveSurveyRequest, StoreSurveyRequest, UpdateSurveyRequest } from '../requests/SurveyRequest';
import { VoteRequest } from '../requests/VoteRequest';
;
const router = express.Router()


router.post('/vote/:id', authorize(Roles.User), VoteRequest, validateRequest, vote);  
router.get('/', authorize(Roles.Admin), AuthenticatedUserRequest, validateRequest, index);
router.get('/:search', authorize(Roles.Admin), AuthenticatedUserRequest, validateRequest, search);
router.post('/', authorize(Roles.Admin), StoreSurveyRequest, validateRequest,  store);
router.put('/:id', authorize(Roles.Admin), UpdateSurveyRequest, validateRequest,  update);
router.delete('/:id', authorize(Roles.Admin), RemoveSurveyRequest, validateRequest,  remove);    

  
export  {router as surveyRoutes};