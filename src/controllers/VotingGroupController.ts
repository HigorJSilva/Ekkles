import { NextFunction, Request, Response} from 'express';
import * as VotingGroupService from '../services/VotingGroupService';
import { ApiResponse } from '../helpers/Response';
import { getFilteredRequest } from '../helpers/Utils';
import { AuthenticatedUserInterface } from '../requests/AuthenticatedUserRequest';
import { StoreVotingGroupInterface } from '../requests/VotingGroupRequest';


export async function index(req: Request, res:Response, next:NextFunction) {
    const filteredRequest:AuthenticatedUserInterface = <AuthenticatedUserInterface> getFilteredRequest(req);

    VotingGroupService.index(filteredRequest.user.id)
        .then( user => user 
            ?  res.status(200).json( new ApiResponse(true, null, user, null))
            :  res.status(422).json( new ApiResponse(false, 'Erro ao listar grupos', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function store(req: Request, res:Response, next:NextFunction) {
    const filteredRequest: StoreVotingGroupInterface = <StoreVotingGroupInterface> getFilteredRequest(req);

    VotingGroupService.store(filteredRequest)
        .then( user => user 
            ?  res.status(200).json( new ApiResponse(true, null, user, null))
            :  res.status(422).json( new ApiResponse(false, 'Erro ao cadastrar grupos', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

