import { NextFunction, Request, Response} from 'express';
import * as AuthService from '../services/AuthService';
import { ApiResponse } from '../helpers/Response';
import { LoginInterface, RegisterInterface } from '../requests/AuthRequests';
import { getFilteredRequest } from '../helpers/Utils';
import { errorCreateUsers, errorLogin } from '../helpers/ErrorsMessages';


export async function authenticate(req: Request, res:Response, next:NextFunction) {
    const filteredRequest: LoginInterface = <LoginInterface> getFilteredRequest(req);
    AuthService.authenticate(filteredRequest)
        .then( user => user 
            ?  res.status(200).json( new ApiResponse(true, null, user, null))
            :  res.status(422).json( new ApiResponse(false, errorLogin, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}

export function register(req: Request, res:Response, next:NextFunction) {

    const filteredRequest: RegisterInterface = <RegisterInterface> getFilteredRequest(req);

    AuthService.store(filteredRequest)
        .then(user => user 
            ? (res.status(200).json( new ApiResponse(true, null, user, null)))
            : res.status(422).json( new ApiResponse(false, errorCreateUsers, null, null))
        )
        .catch((err: Error) => next(res.status(422).json( new ApiResponse(false, err.toString().replace('Error: ',''), null, null))));
}