import { body } from 'express-validator';
import * as ErrorsMessages from '../helpers/ErrorsMessages'

const RegisterRequest = [
    body('email')
        .notEmpty().withMessage(ErrorsMessages.requiredMessage).bail()
        .normalizeEmail()
        .isEmail().withMessage(ErrorsMessages.invalidEmailMessage),
    body('nome')
        .notEmpty().withMessage(ErrorsMessages.requiredMessage).bail()
        .isLength({ min: 5 }).withMessage(ErrorsMessages.tamanhoMessage(5)),
    body('senha')
        .notEmpty().withMessage(ErrorsMessages.requiredMessage).bail()
        .isLength({ min: 5 }).withMessage(ErrorsMessages.tamanhoMessage(5)),
];

export { RegisterRequest };