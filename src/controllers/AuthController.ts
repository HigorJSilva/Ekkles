import express, { NextFunction, Request, Response} from 'express';
import * as AuthService from '../services/AuthService';
import { ApiResponse } from '../helpers/Response';
import authorize from '../middleware/Auth';
import { Roles } from '../helpers/Roles';

const router = express.Router();


// public route
// router.post('/authenticate', authenticate);     
// router.post('/register', register);         

// admin only
//  router.get('/users', authorize(Roles.Admin), AuthService.getAll);

 // user only
//  router.post('/alterarSenha', upload.none(), authorize(Role.User), alterarSenha);


export {
    authenticate,
    register
}

async function authenticate(req: Request, res:Response, next:NextFunction) {

    AuthService.authenticate(req.body.email, req.body.senha )
    .then( user => user 
        ? res.status(200).json( new ApiResponse(true, null, user, null))
        : res.status(422).json( new ApiResponse(false, 'Usuário ou senha  incorreta', null, null)))
    .catch(err => next(err))
}
function register(req: Request, res:Response, next:NextFunction) {
    AuthService.store(req.body)
        .then(user => user 
            ? res.status(200).json( new ApiResponse(true, null, user, null))
            : res.status(422).json( new ApiResponse(false, 'Erro ao cadastrar', null, null)))
        .catch((err: Error) => next(err));
}