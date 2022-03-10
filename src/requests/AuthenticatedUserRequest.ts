import {  param } from 'express-validator';
import {Types} from 'mongoose';
import * as ErrorMessages from '../helpers/ErrorsMessages';

export interface AuthenticatedUserInterface extends Record<string,any> {
    id: Types.ObjectId
}

const AuthenticatedUserRequest = [
    param('user.id').notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
];

export {  AuthenticatedUserRequest };