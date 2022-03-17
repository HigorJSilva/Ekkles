import { body, param } from 'express-validator';
import { Types} from 'mongoose';
import * as ErrorMessages from '../helpers/ErrorsMessages';
import { exists } from './customRules/CustomRules';
import { AuthenticatedUserInterface, AuthenticatedUserRequest } from './AuthenticatedUserRequest';
import { User } from '../models/User';

export interface StoreVotingGroupInterface extends AuthenticatedUserInterface {
    nome: string,
    adminId: Types.ObjectId,
    usersId: Array<Types.ObjectId>,
}

export interface UpdateVotingGroupInterface extends StoreVotingGroupInterface {
    id:Types.ObjectId,
}

export interface RemoveVotingGroupInterface extends AuthenticatedUserInterface {
    id:Types.ObjectId,
}

export const StoreVotingGroupRequest = [
    ...AuthenticatedUserRequest,
    body('nome')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .isLength({ min: 5 }).withMessage(ErrorMessages.fieldSizeMessage(4)),
    body('usersId')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .custom(async (value: Array<string>, {req}) => exists(value, User, req.user.id))
            .withMessage(ErrorMessages.existsMessage),
];

export const RemoveVotingGroupRequest = [
    param('id').notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
    .isMongoId().bail().withMessage(ErrorMessages.invalidMongoId)
];

export const UpdateVotingGroupRequest = [
    ...StoreVotingGroupRequest,
    ...RemoveVotingGroupRequest,
];