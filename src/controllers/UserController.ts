import * as UserService from '../services/UserService';
import {User, UserInterface} from '../models/User';

import { getFilteredRequest } from '../helpers/Utils';
import { UpdateInterface } from '../requests/UserRequests';
import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../helpers/Response';

export async function me(req: Request, res:Response, next:NextFunction) {

     //@ts-ignore
    UserService.me(req.user.id)
    
        .then(user => user 
            ? (res.status(200).json( new ApiResponse(true, null, user, null)))
            : res.status(422).json( new ApiResponse(false, 'Erro ao cadastrar', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function update(req: Request, res:Response, next:NextFunction) {

    const filteredRequest: UpdateInterface = <UpdateInterface> getFilteredRequest(req);
     //@ts-ignore
    UserService.update(filteredRequest,  req.user.id)
    
        .then(user => user 
            ? (res.status(200).json( new ApiResponse(true, null, user, null)))
            : res.status(422).json( new ApiResponse(false, 'Erro ao cadastrar', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export async function remove(req: Request, res:Response, next:NextFunction) {

    const filteredRequest: UpdateInterface = <UpdateInterface> getFilteredRequest(req);
     //@ts-ignore
    UserService.remove(filteredRequest,  req.user.id)
    
        .then(user => user 
            ? (res.status(200).json( new ApiResponse(true, null, null, null)))
            : res.status(422).json( new ApiResponse(false, 'Erro ao cadastrar', null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}


