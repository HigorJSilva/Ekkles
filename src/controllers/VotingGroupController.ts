import { NextFunction, Request, Response} from 'express';
import * as VotingGroupService from '../services/VotingGroupService';
import { ApiResponse } from '../helpers/Response';
import { getFilteredRequest } from '../helpers/Utils';
import { AuthenticatedUserInterface } from '../requests/AuthenticatedUserRequest';
import { RemoveVotingGroupInterface, StoreVotingGroupInterface, UpdateVotingGroupInterface } from '../requests/VotingGroupRequest';


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

export async function update(req: Request, res:Response, next:NextFunction) {
    const filteredRequest: UpdateVotingGroupInterface = <UpdateVotingGroupInterface> getFilteredRequest(req);

    VotingGroupService.update(filteredRequest)
        .then( user => user 
            ?  res.status(200).json( new ApiResponse(true, null, null, null))
            :  res.status(422).json( new ApiResponse(false, 'Erro ao alterar grupos', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}


export async function remove(req: Request, res:Response, next:NextFunction) {
    const filteredRequest: RemoveVotingGroupInterface = <RemoveVotingGroupInterface> getFilteredRequest(req);

    VotingGroupService.remove(filteredRequest.id)
        .then( user => user 
            ?  res.status(200).json( new ApiResponse(true, null, null, null))
            :  res.status(422).json( new ApiResponse(false, 'Erro ao remover grupos', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}


