import * as UserService from '../services/UserService';

import { getFilteredRequest } from '../helpers/Utils';
import { getUserByIdInterface, UpdateInterface } from '../requests/UserRequests';
import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../helpers/Response';
import { AuthenticatedUserInterface } from '../requests/AuthenticatedUserRequest';
import { errorListUsers, errorRemoveUsers, errorUpdateUsers } from '../helpers/ErrorsMessages';

export async function me(req: Request, res:Response, next:NextFunction) {

    UserService.me(req.user!.id)
    
        .then(user => user 
            ? (res.status(200).json( new ApiResponse(true, null, user, null)))
            : res.status(422).json( new ApiResponse(false, errorListUsers, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function update(req: Request, res:Response, next:NextFunction) {

    const filteredRequest: UpdateInterface = <UpdateInterface> getFilteredRequest(req);

    UserService.update(filteredRequest,  filteredRequest.user.id)
    
        .then(user => user 
            ? (res.status(200).json( new ApiResponse(true, null, user, null)))
            : res.status(422).json( new ApiResponse(false, errorUpdateUsers, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function remove(req: Request, res:Response, next:NextFunction) {

    const filteredRequest: UpdateInterface = <UpdateInterface> getFilteredRequest(req);

    UserService.remove(filteredRequest.user.id)
    
        .then(user => user 
            ? (res.status(200).json( new ApiResponse(true, null, null, null)))
            : res.status(422).json( new ApiResponse(false, errorRemoveUsers, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function getAll(req: Request, res:Response, next:NextFunction) {

    const filteredRequest: AuthenticatedUserInterface = <AuthenticatedUserInterface> getFilteredRequest(req);

    UserService.getAll(filteredRequest.user.id)
        .then(users => users 
            ? (res.status(200).json( new ApiResponse(true, null, users, null)))
            : res.status(422).json( new ApiResponse(false, errorListUsers, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function getById(req: Request, res:Response, next:NextFunction) {

    const filteredRequest: getUserByIdInterface = <getUserByIdInterface> getFilteredRequest(req);

    UserService.getById(filteredRequest.user.id, filteredRequest.id)
        .then(users => users 
            ? (res.status(200).json( new ApiResponse(true, null, users, null)))
            : res.status(422).json( new ApiResponse(false, errorListUsers, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}


