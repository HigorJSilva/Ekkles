import * as UserService from '../services/UserService';

import { getFilteredRequest } from '../helpers/Utils';
import { UpdateInterface } from '../requests/UserRequests';
import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../helpers/Response';

export async function me(req: Request, res:Response, next:NextFunction) {

    UserService.me(req.user!.id)
    
        .then(user => user 
            ? (res.status(200).json( new ApiResponse(true, null, user, null)))
            : res.status(422).json( new ApiResponse(false, 'Erro ao cadastrar', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function update(req: Request, res:Response, next:NextFunction) {

    const filteredRequest: UpdateInterface = <UpdateInterface> getFilteredRequest(req);

    UserService.update(filteredRequest,  filteredRequest.user.id)
    
        .then(user => user 
            ? (res.status(200).json( new ApiResponse(true, null, user, null)))
            : res.status(422).json( new ApiResponse(false, 'Erro ao cadastrar', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function remove(req: Request, res:Response, next:NextFunction) {

    const filteredRequest: UpdateInterface = <UpdateInterface> getFilteredRequest(req);

    UserService.remove(filteredRequest.user.id)
    
        .then(user => user 
            ? (res.status(200).json( new ApiResponse(true, null, null, null)))
            : res.status(422).json( new ApiResponse(false, 'Erro ao cadastrar', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}


