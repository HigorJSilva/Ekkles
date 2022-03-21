import { body } from 'express-validator';
import * as ErrorMessages from '../helpers/ErrorsMessages';
import { estados, genero } from '../helpers/dataHelpers';
import { inArray, unique } from './customRules/CustomRules';
import { User } from '../models/User';

export interface LoginInterface extends Record<string,any> {
    email: string,
    senha: string,
}
export interface RegisterInterface extends LoginInterface {
    nome: string,
    idade: number,
    estado: string,
    genero: string,
    codigo?: string,
}


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
        .isLength({ min: 5 }).withMessage(ErrorMessages.fieldSizeMessage(5)),
    body('idade')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .isNumeric().withMessage(ErrorMessages.isNumericMessage),
    body('estado')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .custom((value) => inArray(value, estados, 'sigla')).withMessage(ErrorMessages.invalidMessage),
    body('genero')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .custom((value) => inArray(value, genero, 'valor')).withMessage(ErrorMessages.invalidMessage),
    body('codigo')
        .optional({ nullable: true }),
    body('adminId')
        .if(body('codigo').isEmpty())
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
];

export { RegisterRequest, LoginRequest };