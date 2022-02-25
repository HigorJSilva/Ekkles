import express, { NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '../helpers/Response';

export function validateRequest (
    req: Request,
    res: Response,
    next: NextFunction,
){
    const erros = validationResult(req) ;
    if(!erros.isEmpty()){
        res.status(422).json( new ApiResponse(false, 'Falha ao cadastrar Usuário', erros.array(), null))
    }
}