import { body } from 'express-validator';

const RegisterRequest = [
    body('email')
        .normalizeEmail()
        .isEmail(),
    body('nome')
        .notEmpty().withMessage('Campo Obrigatorio')
        .isLength({ min: 5 }).withMessage('Campo precisa ser maior que 5 caracteres'),
    body('senha')
        .isLength({ min: 5 })
];

export { RegisterRequest };