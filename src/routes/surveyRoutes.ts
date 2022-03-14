import express from 'express';
import { index, store, update, remove, search } from '../controllers/SurveyController';
import { Roles } from '../helpers/Roles';
import { authorize } from '../middleware/Auth';
import { validateRequest } from '../middleware/ValidateRequest';
import { AuthenticatedUserRequest } from '../requests/AuthenticatedUserRequest';import { RemoveSurveyRequest, StoreSurveyRequest, UpdateSurveyRequest } from '../requests/SurveyRequest';
;
const router = express.Router()



router.get('/', authorize(Roles.Admin), AuthenticatedUserRequest, validateRequest, index);
router.get('/:search', authorize(Roles.Admin), AuthenticatedUserRequest, validateRequest, search);
router.post('/', authorize(Roles.Admin), StoreSurveyRequest, validateRequest,  store);
router.put('/:id', authorize(Roles.Admin), UpdateSurveyRequest, validateRequest,  update);
router.delete('/:id', authorize(Roles.Admin), RemoveSurveyRequest, validateRequest,  remove);   

  
export  {router as surveyRoutes};