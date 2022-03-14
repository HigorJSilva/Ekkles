import { body, param } from 'express-validator';
import { Types} from 'mongoose';
import * as ErrorMessages from '../helpers/ErrorsMessages';
import { exists } from './customRules/CustomRules';
import { AuthenticatedUserInterface, AuthenticatedUserRequest } from './AuthenticatedUserRequest';
import { User } from '../models/User';
import { SurveyOptionsInterface } from '../models/Survey';
import { VotingGroup } from '../models/VotingGroup';

export interface StoreSurveyInterface extends AuthenticatedUserInterface {
    nome: string
    votingGroup: Types.ObjectId
    opcoes: Array<SurveyOptionsInterface>
    usersIds: Array<Types.ObjectId>
}

export interface UpdateSurveyInterface extends StoreSurveyInterface {
    id:Types.ObjectId,
}

export interface RemoveSurveyInterface extends AuthenticatedUserInterface {
    id:Types.ObjectId,
}

export const StoreSurveyReques = [
    ...AuthenticatedUserRequest,
    body('nome')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .isLength({ min: 5 }).withMessage(ErrorMessages.fieldSizeMessage(5)),
    body('votingGroup')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .custom(async (value: Array<string>) => exists(value, VotingGroup))
            .withMessage(ErrorMessages.existsMessage),
    body('opcoes')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .isArray().withMessage(ErrorMessages.arrayMessage),
];

export const RemoveSurveyRequest = [
    param('id').notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
];

export const UpdateSurveyRequest = [
    ...StoreSurveyReques,
    ...RemoveSurveyRequest,
];