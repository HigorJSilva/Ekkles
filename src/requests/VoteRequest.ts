import { body, param } from "express-validator";
import * as ErrorMessages from '../helpers/ErrorsMessages';
import {Types} from "mongoose"; 
import { AuthenticatedUserRequest } from "./AuthenticatedUserRequest";
import { checkSurveyEndDate } from "./customRules/CustomRules";

export interface VotesInterface extends Record<string, any> {
    optionId: Types.ObjectId,
    userId: Types.ObjectId,
}

const VoteRequest = [
    ...AuthenticatedUserRequest,
    param('id')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
        .isMongoId().bail().withMessage(ErrorMessages.invalidMongoId)
        .custom( (value: Types.ObjectId) => checkSurveyEndDate(value)).withMessage(ErrorMessages.voteAfterEndDate),
    body('optionId')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail(),
];

export { VoteRequest };