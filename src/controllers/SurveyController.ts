import { NextFunction, Request, Response} from 'express';
import * as SurveyService from '../services/SurveyService';
import { ApiResponse } from '../helpers/Response';
import { getFilteredRequest } from '../helpers/Utils';
import { AuthenticatedUserInterface } from '../requests/AuthenticatedUserRequest';
import { RemoveSurveyInterface, StoreSurveyInterface, UpdateSurveyInterface } from '../requests/SurveyRequest';


export async function index(req: Request, res:Response, next:NextFunction) {
    const filteredRequest:AuthenticatedUserInterface = <AuthenticatedUserInterface> getFilteredRequest(req);

    SurveyService.index(filteredRequest.user.id)
        .then( user => user 
            ?  res.status(200).json( new ApiResponse(true, null, user, null))
            :  res.status(422).json( new ApiResponse(false, 'Erro ao listar grupos', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function store(req: Request, res:Response, next:NextFunction) {
    const filteredRequest: StoreSurveyInterface = <StoreSurveyInterface> getFilteredRequest(req);

    SurveyService.store(filteredRequest)
        .then( user => user 
            ?  res.status(200).json( new ApiResponse(true, null, user, null))
            :  res.status(422).json( new ApiResponse(false, 'Erro ao cadastrar grupos', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function update(req: Request, res:Response, next:NextFunction) {
    const filteredRequest: UpdateSurveyInterface = <UpdateSurveyInterface> getFilteredRequest(req);

    SurveyService.update(filteredRequest)
        .then( user => user 
            ?  res.status(200).json( new ApiResponse(true, null, null, null))
            :  res.status(422).json( new ApiResponse(false, 'Erro ao alterar grupos', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}


export async function remove(req: Request, res:Response, next:NextFunction) {
    const filteredRequest: RemoveSurveyInterface = <RemoveSurveyInterface> getFilteredRequest(req);

    SurveyService.remove(filteredRequest.id)
        .then( user => user 
            ?  res.status(200).json( new ApiResponse(true, null, null, null))
            :  res.status(422).json( new ApiResponse(false, 'Erro ao remover grupos', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}


