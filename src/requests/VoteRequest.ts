import { body, param } from "express-validator";
import * as ErrorMessages from '../helpers/ErrorsMessages';
import {Types} from "mongoose"; 
import { AuthenticatedUserRequest } from "./AuthenticatedUserRequest";
import { exists } from "./customRules/CustomRules";
import { Survey } from "../models/Survey";

export interface VotesInterface extends Record<string, any> {
    optionId: Types.ObjectId,
    userId: Types.ObjectId,
}

const VoteRequest = [
    ...AuthenticatedUserRequest,
    param('id')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail(),
    body('optionId')
        .notEmpty().withMessage(ErrorMessages.requiredMessage).bail()
];

export { VoteRequest };