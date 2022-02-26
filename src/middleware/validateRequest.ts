import express, { NextFunction, Request, Response} from 'express';
import { Result, validationResult, ValidationError } from 'express-validator';
import { ApiResponse } from '../helpers/Response';
import * as _ from "lodash";

export function validateRequest (
    req: Request,
    res: Response,
    next: NextFunction,
){
    const erros = validationResult(req) ;
    if(!erros.isEmpty()){

        var grouped = _.groupBy(erros.array(), function(item: {param: string}){
            return item.param;
          });
          var result = _.each(grouped, function(value: any, key: any, list: any){
              let vava: Array<any> = [];
              value.forEach((element:{msg: string}) => {
                vava.push(element.msg)
              });
             
            return list[key] = vava;
          });

        res.status(422).json( new ApiResponse(false, 'Falha ao cadastrar Usuário', result, null))
    }

    next();
}