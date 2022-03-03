import { body } from 'express-validator';
import * as ErrorMessages from '../helpers/ErrorsMessages';
import { estados, genero } from '../helpers/dataHelpers';
import { inArray, unique } from './customRules/customRules';
import { User } from '../models/User';

const LoginRequest = [
    body('email')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .normalizeEmail()
        .isEmail().withMessage(ErrorMessages.invalidEmailMessage),

    body('senha')
    .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
    .isLength({ min: 5 }).withMessage(ErrorMessages.fieldSizeMessage(5)),
];

const RegisterRequest = [
    ...LoginRequest,
    body('email')
        .custom(async (value: string) => unique(value, 'email', User)).withMessage(ErrorMessages.uniqueMessage),
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
];

export { RegisterRequest };