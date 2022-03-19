import { NextFunction, Request, Response} from 'express';
import * as SurveyService from '../services/SurveyService';
import { ApiResponse } from '../helpers/Response';
import { getFilteredRequest } from '../helpers/Utils';
import { AuthenticatedUserInterface } from '../requests/AuthenticatedUserRequest';
import { RemoveSurveyInterface, StoreSurveyInterface, UpdateSurveyInterface } from '../requests/SurveyRequest';
import { StoreVotesInterface, GetVoteInterface } from '../requests/VoteRequest';
import { errorCreateSurvey, errorListPollResult, errorListSurvey, errorRemoveSurvey, errorUpdateSurvey } from '../helpers/ErrorsMessages';


export async function index(req: Request, res:Response, next:NextFunction) {
    const filteredRequest:AuthenticatedUserInterface = <AuthenticatedUserInterface> getFilteredRequest(req);

    SurveyService.index(filteredRequest.user.id)
        .then( surveys => surveys 
            ?  res.status(200).json( new ApiResponse(true, null, surveys, null))
            :  res.status(422).json( new ApiResponse(false, errorListSurvey, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function search(req: Request, res:Response, next:NextFunction) {
    const filteredRequest:AuthenticatedUserInterface = <AuthenticatedUserInterface> getFilteredRequest(req);

    SurveyService.search(filteredRequest.user.id, req.params.search)
        .then( surveys => surveys 
            ?  res.status(200).json( new ApiResponse(true, null, surveys, null))
            :  res.status(422).json( new ApiResponse(false, errorListSurvey, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function store(req: Request, res:Response, next:NextFunction) {
    const filteredRequest: StoreSurveyInterface = <StoreSurveyInterface> getFilteredRequest(req);

    SurveyService.store(filteredRequest)
        .then( survey => survey 
            ?  res.status(200).json( new ApiResponse(true, null, survey, null))
            :  res.status(422).json( new ApiResponse(false, errorCreateSurvey, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function update(req: Request, res:Response, next:NextFunction) {
    const filteredRequest: UpdateSurveyInterface = <UpdateSurveyInterface> getFilteredRequest(req);

    SurveyService.update(filteredRequest)
        .then( survey => survey 
            ?  res.status(200).json( new ApiResponse(true, null, survey, null))
            :  res.status(422).json( new ApiResponse(false, errorUpdateSurvey, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}


export async function remove(req: Request, res:Response, next:NextFunction) {
    const filteredRequest: RemoveSurveyInterface = <RemoveSurveyInterface> getFilteredRequest(req);

    SurveyService.remove(filteredRequest.id)
        .then( survey => survey
            ?  res.status(200).json( new ApiResponse(true, null, null, null))
            :  res.status(422).json( new ApiResponse(false, errorRemoveSurvey, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function vote(req: Request, res:Response, next:NextFunction) {
    const filteredRequest:StoreVotesInterface = <StoreVotesInterface> getFilteredRequest(req);

    SurveyService.vote(filteredRequest)
        .then( pollRequest => pollRequest 
            ?  res.status(200).json( new ApiResponse(true, null, pollRequest, null))
            :  res.status(422).json( new ApiResponse(false, errorListPollResult, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function getVoteResult(req: Request, res:Response, next:NextFunction) {
    const filteredRequest:GetVoteInterface = <GetVoteInterface> getFilteredRequest(req);

    SurveyService.getVoteResult(filteredRequest)
        .then( pollResult => pollResult
            ?  res.status(200).json( new ApiResponse(true, null, pollResult, null))
            :  res.status(422).json( new ApiResponse(false, errorListPollResult, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

