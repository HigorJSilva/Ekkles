import { body, param } from "express-validator";
import * as ErrorMessages from '../helpers/ErrorsMessages';
import {Types} from "mongoose"; 
import { AuthenticatedUserRequest } from "./AuthenticatedUserRequest";
import { votingAuthRule, checkSurveyEndDate } from "./customRules/CustomRules";

export interface StoreVotesInterface extends Record<string, any> {
    optionId: Types.ObjectId,
    userId: Types.ObjectId,
}
export interface GetVoteInterface extends Record<string, any> {
    id: Types.ObjectId,
}

export const GetVoteRequest = [
    ...AuthenticatedUserRequest,
    param('id')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .isMongoId().bail().withMessage(ErrorMessages.invalidMongoId),
    param('user.id')
        .custom(async (value, {req}) => votingAuthRule(value, req.params!.id)).withMessage(ErrorMessages.existsMessage)
];

export const StoreVoteRequest = [
    ...AuthenticatedUserRequest,
    param('id')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .isMongoId().bail().withMessage(ErrorMessages.invalidMongoId)
        .custom( (value: Types.ObjectId) => checkSurveyEndDate(value)).withMessage(ErrorMessages.voteAfterEndDate),
    body('optionId')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail(),
];
