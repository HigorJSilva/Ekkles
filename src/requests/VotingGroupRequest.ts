import { body } from 'express-validator';
import * as ErrorMessages from '../helpers/ErrorsMessages';
import { estados } from '../helpers/dataHelpers';
import { inArray } from './customRules/CustomRules';
import { AuthenticatedUserInterface, AuthenticatedUserRequest } from './AuthenticatedUserRequest';

export interface StoreVotingGroupInterface extends AuthenticatedUserInterface {
    nome: string,
    idade: number,
    estado: string,
    genero: string,
}

export const StoreVotingGroupRequest = [
    ...AuthenticatedUserRequest,
    body('nome')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .isLength({ min: 5 }).withMessage(ErrorMessages.fieldSizeMessage(4)),
    body('usersId')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .custom((value) => inArray(value, estados, 'sigla')).withMessage(ErrorMessages.invalidMessage),
];