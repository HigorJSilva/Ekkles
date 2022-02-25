import { body } from 'express-validator';

const RegisterRequest = [
    body('email')
        .normalizeEmail()
        .isEmail(),
    body('nome')
        .isString()
        .isLength({ min: 5 }),
    body('senha')
    .   isLength({ min: 5 })
];

export { RegisterRequest };