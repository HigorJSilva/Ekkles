import { body, param } from 'express-validator';
import * as ErrorMessages from '../helpers/ErrorsMessages';
import { estados, genero } from '../helpers/dataHelpers';
import { inArray } from './customRules/CustomRules';
import { AuthenticatedUserRequest } from './AuthenticatedUserRequest';

export interface UpdateInterface extends Record<string,any> {
    nome: string,
    idade: number,
    estado: string,
    genero: string,
}

const UpdateRequest = [
    ...AuthenticatedUserRequest,
    body('nome')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .isLength({ min: 5 }).withMessage(ErrorMessages.fieldSizeMessage(4)),
    body('idade')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .isNumeric().withMessage(ErrorMessages.isNumericMessage),
    body('estado')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .custom((value) => inArray(value, estados, 'sigla')).withMessage(ErrorMessages.invalidMessage),
    body('genero')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .custom((value) => inArray(value, genero, 'valor')).withMessage(ErrorMessages.invalidMessage),
    param('user.id').notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
];

export { UpdateRequest };